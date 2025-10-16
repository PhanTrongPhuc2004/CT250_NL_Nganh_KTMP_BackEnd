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
require('dotenv').config();

class NguoiDungController {
  async register(req, res) {
    const vaiTro = req.body.vaiTro;
    try {
      // Kiểm tra vai trò hợp lệ
      const allowedRoles = ['admin', 'fan', 'huanluyenvien', 'cauthu'];
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
    } catch (error) {
      console.error('ERROR when saving user:', error);
      res.status(500).json({ message: 'Lỗi server', error });
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
