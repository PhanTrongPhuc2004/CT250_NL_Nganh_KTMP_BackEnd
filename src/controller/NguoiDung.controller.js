const mongoose = require('mongoose');
const NguoiDung = require('../models/NguoiDung');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class NguoiDungController {
  async login(req, res) {
    const { tenDangNhap, matKhau } = req.body;
    // Thêm logic xác thực người dùng ở đây
    const nguoidung = await NguoiDung.findOne({ tenDangNhap, matKhau });
    if (!nguoidung) {
      return res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng' });
    }

    const token = jwt.sign({ maNguoiDung: nguoidung.maNguoiDung }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 3600000,
    });

    res.status(200).json({ message: 'Đăng nhập thành công' });
  }

  check(req, res) {
    console.log('Check user called, req.user:', req.user);
    if (req.cookies && req.cookies.token) {
      res.json({ message: 'Đã đăng nhập', user: req.user });
    } else {
      res.status(401).json({ message: 'Chưa đăng nhập' });
    }
  }
  logout(req, res) {
    res.clearCookie('token');
    res.status(200).json({ message: 'Đăng xuất thành công' });
  }
}
module.exports = new NguoiDungController();
