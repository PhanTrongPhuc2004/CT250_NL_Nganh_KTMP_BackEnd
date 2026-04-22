// src/routes/nguoiDung.route.js
const NguoiDungController = require('../controller/NguoiDungController');
const authMiddleware = require('../middlewares/authMiddleware');
const nguoiDungRouter = require('express').Router();

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const NguoiDung = require('../models/NguoiDung.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();



nguoiDungRouter.post('/google', async (req, res) => {
  try {
    // console.log('📨 Received Google login request');
    // console.log('Request body:', req.body);

    const { clientId } = req.body;
    let credential = req.body.credential || req.body.token;

    if (!credential) {
      console.log('❌ Missing Google token');
      return res.status(400).json({
        success: false,
        message: 'Thiếu Google ID token'
      });
    }

    // console.log('🔐 Verifying Google ID token...');

    // Verify ID token với Google
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture, email_verified } = payload;

    // console.log('👤 Google user info:', { email, name, googleId });

    if (!email_verified) {
      return res.status(400).json({
        success: false,
        message: 'Email chưa được xác thực với Google'
      });
    }

    // Tìm hoặc tạo user trong database
    // ĐẢM BẢO IMPORT ĐÚNG MODEL
    let user = await NguoiDung.findOne({
      $or: [{ googleId }, { email }]
    });

    if (!user) {
      user = new NguoiDung({
        googleId,
        email,
        
        hoVaTen: name,
        anhMinhHoa: picture,
        vaiTro: 'nguoihammo',
        isEmailVerified: true
      });
      await user.save();
    } else {
      if (!user.googleId) {
        user.googleId = googleId;
      }
      if (!user.avatar) {
        user.avatar = picture;
      }
      await user.save();
    }

    // Tạo JWT token
    const accessToken = jwt.sign(
      {
        maNguoiDung: user.maNguoiDung,
        vaiTro: user.vaiTro
      },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      {
        maNguoiDung: user.maNguoiDung,
        vaiTro: user.vaiTro
      },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    // Lưu refreshToken vào database
    await NguoiDung.findByIdAndUpdate(user._id, {
      refreshToken: refreshToken,
    });

    // ✅ SỬA: SET COOKIES với thời gian đúng
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000, // ✅ 15 phút
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
    });

    console.log('**********json tra ve', {
      message: 'Đăng nhập thành công',
      user: {
        _id: user._id,
        email: user.email,
        hoVaTen: user.name,
        anhMinhHoa: user.avatar,
        vaiTro: user.vaiTro, // ✅ THÊM: Quan trọng cho frontend
      }
    });

    res.status(200).json({
      message: 'Đăng nhập thành công',
      user: {
        _id: user._id,
        email: user.email,
        hoVaTen: user.name,
        anhMinhHoa: user.avatar,
        vaiTro: user.vaiTro, // ✅ THÊM: Quan trọng cho frontend
      }
    });

  } catch (error) {
    console.error('❌ Google auth error:', error);
    
    let errorMessage = 'Xác thực Google thất bại';
    
    if (error.message.includes('Token used too late')) {
      errorMessage = 'Token đã hết hạn';
    } else if (error.message.includes('Invalid token')) {
      errorMessage = 'Token không hợp lệ';
    }

    res.status(401).json({
      success: false,
      message: errorMessage,
      error: error.message // Thêm chi tiết lỗi cho debug
    });
  }
});
nguoiDungRouter.post('/', NguoiDungController.register);
nguoiDungRouter.post('/login', NguoiDungController.login);
nguoiDungRouter.post('/logout', NguoiDungController.logout);
nguoiDungRouter.get('/check', authMiddleware, NguoiDungController.check);
nguoiDungRouter.get('/', NguoiDungController.getAllUsers);
nguoiDungRouter.put('/:id', NguoiDungController.updateUser);
nguoiDungRouter.delete('/:id', NguoiDungController.deleteUser);
nguoiDungRouter.get('/me', authMiddleware, NguoiDungController.getMe);
nguoiDungRouter.put('/capnhat/:id', NguoiDungController.updateUser);
nguoiDungRouter.get('/vaitro', NguoiDungController.getUserByRole);
nguoiDungRouter.get('/:id', NguoiDungController.getUserById);
nguoiDungRouter.post('/refresh-token', NguoiDungController.refreshToken);
nguoiDungRouter.get('/vaitro', NguoiDungController.getUserByRole);
module.exports = nguoiDungRouter;
