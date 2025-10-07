const mongoose = require('mongoose');
const NguoiDung = require('../models/NguoiDung.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class NguoiDungController {
  async register(req, res) {
    const { hoVaTen, email, tenDangNhap, matKhau, vaiTro } = req.body;
    try {
      const newNguoiDung = new NguoiDung({ hoVaTen, email, tenDangNhap, matKhau, vaiTro });

      const saved = await newNguoiDung.save();
      console.log('newNguoiDung:', newNguoiDung);
      console.log('SAVED DOC:', JSON.stringify(saved, null, 2));

      return res.status(201).json({ message: 'Đăng ký thành công', data: saved });
    } catch (error) {
      console.error('ERROR when saving NguoiDung:', error);
    }
  }
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

    res.status(200).json({ message: 'Đăng nhập thành công', vaiTro: nguoidung.vaiTro });
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

  // Cập nhật thông tin người dùng
  async updateUser(req, res) {
    try {
      const updatedUser = await NguoiDung.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: 'Không tìm thấy người dùng' });
      }
      res.status(200).json({ message: 'Cập nhật thành công', data: updatedUser });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server', error });
    }
  }

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
}

module.exports = new NguoiDungController();
