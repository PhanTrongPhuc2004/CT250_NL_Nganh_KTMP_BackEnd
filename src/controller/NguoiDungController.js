const mongoose = require('mongoose');
const NguoiDung = require('../models/NguoiDung.model');
const Admin = require('../models/Admin.model');
const jwt = require('jsonwebtoken');
const { default: AdminModel } = require('../models/Admin.model');
const Cauthu = require('../models/cauthu');
const HuanLuyenVien = require('../models/HuanLuyenVien.model');
const NguoiHamMo = require('../models/NguoiHamMo.model');
const adminService = require('../services/adminService');
const cauThuService = require('../services/cauthuService');
const huanLuyenVienService = require('../services/huanLuyenVienService');
const nguoiHamMoService = require('../services/nguoiHamMoService');
const { generateTokens } = require('../utils/auth');
require('dotenv').config();

class NguoiDungController {
  async register(req, res) {
    const vaiTro = req.body.vaiTro;
    try {
      // Kiểm tra vai trò hợp lệ
      const allowedRoles = ['admin', 'nguoihammo', 'huanluyenvien', 'cauthu'];
      if (!allowedRoles.includes(vaiTro)) {
        return res.status(400).json({ message: 'Vai trò không hợp lệ' });
      }

      // Kiểm tra trùng tên đăng nhập hoặc email
      const existed = await NguoiDung.findOne({
        $or: [{ tenDangNhap: req.body.tenDangNhap }, { email: req.body.email }],
      });
      if (existed) {
        return res.status(409).json({ message: 'Tên đăng nhập hoặc email đã tồn tại' });
      }

      // Nếu là admin thì tạo ở bảng Admin, còn lại tạo ở NguoiDung
      if (vaiTro === 'admin') {
        const newAdmin = await adminService.createAdmin(req.body);
        res.status(200).json({ message: 'Tạo admin thành công', data: newAdmin });
      }
      if (vaiTro === 'cauthu') {
        const newCauthu = await cauThuService.createCauthu(req.body);
        res.status(200).json({ message: 'Tạo cầu thủ thành công', data: newCauthu });
      }
      if (vaiTro === 'huanluyenvien') {
        const newHuanLuyenVien = await huanLuyenVienService.createHuanLuyenVien(req.body);
        res.status(200).json({ message: 'Tạo huấn luyện viên thành công', data: newHuanLuyenVien });
      }
      if (vaiTro === 'nguoihammo') {
        const newNguoiHamMo = await nguoiHamMoService.createNguoiHamMo(req.body);
        res.status(200).json({ message: 'Tạo nguòi hâm mộ thành công', data: newNguoiHamMo });
      }

      console.log('tao nguoi dung moi');
    } catch (error) {
      console.error('ERROR when saving user:', error);
      res.status(500).json({ message: 'Lỗi server', error });
    }
  }
  // controllers/NguoiDungController.js - Hàm login
  async login(req, res) {
    try {
      const { tenDangNhap, matKhau } = req.body;

      const nguoidung = await NguoiDung.findOne({ tenDangNhap, matKhau });
      if (!nguoidung) {
        return res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng' });
      }

      // ✅ SỬA: Tạo tokens với payload đầy đủ
      const accessToken = jwt.sign(
        {
          maNguoiDung: nguoidung.maNguoiDung,
          tenDangNhap: nguoidung.tenDangNhap,
          vaiTro: nguoidung.vaiTro,
        },
        process.env.JWT_SECRET,
        { expiresIn: '15m' } // 15 phút
      );

      const refreshToken = jwt.sign(
        {
          maNguoiDung: nguoidung.maNguoiDung,
          tenDangNhap: nguoidung.tenDangNhap, // ✅ THÊM: Để dùng khi refresh
          vaiTro: nguoidung.vaiTro, // ✅ THÊM: Để dùng khi refresh
          type: 'refresh',
        },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' } // 7 ngày
      );

      // Lưu refreshToken vào database
      await NguoiDung.findByIdAndUpdate(nguoidung._id, {
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

      // ✅ SỬA: Không trả về accessToken (bảo mật hơn)
      res.status(200).json({
        message: 'Đăng nhập thành công',
        user: {
          _id: nguoidung._id,
          tenDangNhap: nguoidung.tenDangNhap,
          hoVaTen: nguoidung.hoVaTen,
          vaiTro: nguoidung.vaiTro,
          maDoiHinh: nguoidung.maDoiHinh, // ✅ THÊM: Quan trọng cho frontend
        },
        // ❌ BỎ: accessToken (đã có trong httpOnly cookie)
      });
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  // Hàm refresh token
  async refreshToken(req, res) {
    try {
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token không tồn tại' });
      }

      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

      const nguoidung = await NguoiDung.findOne({
        maNguoiDung: decoded.maNguoiDung,
        refreshToken: refreshToken,
      });

      if (!nguoidung) {
        return res.status(401).json({ message: 'Refresh token không hợp lệ' });
      }

      // Tạo access token mới
      const newAccessToken = jwt.sign(
        {
          maNguoiDung: nguoidung.maNguoiDung,
          tenDangNhap: nguoidung.tenDangNhap,
          vaiTro: nguoidung.vaiTro,
        },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
      );

      // SET COOKIE MỚI
      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 15 * 60 * 1000,
      });

      res.json({
        accessToken: newAccessToken,
        message: 'Token mới đã được tạo',
      });
    } catch (error) {
      console.error('Lỗi refresh token:', error);
      return res.status(403).json({ message: 'Refresh token không hợp lệ' });
    }
  }
  check(req, res) {
    if (req.cookies && req.cookies.accessToken) {
      res.json({ message: 'Đã đăng nhập', user: req.user });
    } else {
      res.status(401).json({ message: 'Chưa đăng nhập' });
    }
  }
  async logout(req, res) {
    const refreshToken = req.cookies.refreshToken;

    // Xóa refresh token khỏi database
    if (refreshToken) {
      const decoded = jwt.decode(refreshToken);
      if (decoded && decoded.maNguoiDung) {
        await NguoiDung.findOneAndUpdate(
          { maNguoiDung: decoded.maNguoiDung },
          {
            refreshToken: null,
          }
        );
      }
    }

    // Xóa cookies
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.json({ message: 'Đăng xuất thành công' });
  }

  async getAllUsers(req, res) {
    const user = await NguoiDung.find();
    res.status(200).json(user);
  }

  // Lấy thông tin người dùng theo ID
  async getUserById(req, res) {
    try {
      const user = await NguoiDung.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'Không tìm thấy người dùng' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server', error });
    }
  }

  //[PUT] /nguoidung/:id
  async updateUser(req, res) {
    try {
      const requester = req.body;
      if (!requester) {
        return res.status(401).json({ message: 'Chưa đăng nhập' });
      }
      const targetId = req.params.id;
      const role = requester.vaiTro;

      if (role === 'admin') {
        const adminUpdate = await adminService.updateAdmin(targetId, requester);
        return res.status(200).json({ message: 'Cập nhật admin thành công', data: adminUpdate });
      }
      if (role === 'nguoihammo') {
        const fanUpdate = await nguoiHamMoService.updateNguoiHamMo(targetId, requester);
        return res
          .status(200)
          .json({ message: 'Cập nhật người hâm mộ thành công', data: fanUpdate });
      }
      if (role === 'cauthu') {
        const cauthuUpdate = await cauThuService.updateCauthu(targetId, requester);
        return res.status(200).json({ message: 'Cập nhật cầu thủ thành công', data: cauthuUpdate });
      }
      if (role === 'huanluyenvien') {
        const hlvUpdate = await huanLuyenVienService.updateHuanLuyenVien(targetId, requester);
        return res
          .status(200)
          .json({ message: 'Cập nhật huấn luyện viên thành công', data: hlvUpdate });
      }
    } catch (err) {
      console.log(err);
    }
  }
  // ...existing code...

  // Xóa người dùng
  async deleteUser(req, res) {
    try {
      const deletedUser = await NguoiDung.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'Không tìm thấy người dùng' });
      }
      res.status(200).json({ message: 'Xóa thành công' });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server', error });
    }
  }

  async getMe(req, res) {
    res.json(req.user);
  }

  //loc nguoi dung theo role
  //[GET] nguoidung/role?q=
  async getUserByRole(req, res) {
    try {
      const role = req.query.q;
      const users = await NguoiDung.find({ vaiTro: role });
      res.status(200).json(users);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new NguoiDungController();
