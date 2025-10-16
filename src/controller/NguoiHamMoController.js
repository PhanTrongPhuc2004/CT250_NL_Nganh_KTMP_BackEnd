const mongoose = require('mongoose');
const NguoiHamMo = require('../models/NguoiHamMo.model.js');
class NguoiHamMoController {
  async register(req, res) {
    try {
      const { hoVaTen, email, tenDangNhap, matKhau } = req.body;
      const newNguoiHamMo = new NguoiHamMo({
        hoVaTen,
        email,
        tenDangNhap,
        matKhau,
        vaiTro: 'Fan',
      });

      const saved = await newNguoiHamMo.save();

      return res.status(201).json({ message: 'Đăng ký thành công', data: saved });
    } catch (error) {
      console.error('ERROR when saving NguoiHamMo:', error);
      if (error.code === 11000) {
        return res.status(400).json({ message: 'Dữ liệu trùng lặp', detail: error.keyValue });
      }
      if (error.name === 'ValidationError') {
        return res.status(400).json({ message: 'Validation failed', errors: error.errors });
      }

      return res.status(400).json({ message: error.message || 'Lỗi khi đăng ký', error });
    }
  }
}
module.exports = new NguoiHamMoController();
