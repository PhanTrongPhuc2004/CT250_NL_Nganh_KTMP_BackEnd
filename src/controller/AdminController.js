const adminService = require('../services/adminService');

class AdminController {
  // Đăng ký người hâm mộ mới
  async register(req, res) {
    try {
      const { hoVaTen, email, tenDangNhap, matKhau } = req.body;
      const data = { hoVaTen, email, tenDangNhap, matKhau, vaiTro: 'Fan' };
      const saved = await adminService.create(data);
      return res.status(201).json({ message: 'Đăng ký thành công', data: saved });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ message: 'Dữ liệu trùng lặp', detail: error.keyValue });
      }
      if (error.name === 'ValidationError') {
        return res.status(400).json({ message: 'Validation failed', errors: error.errors });
      }
      return res.status(400).json({ message: error.message || 'Lỗi khi đăng ký', error });
    }
  }

  // Lấy tất cả người hâm mộ
  async getAll(req, res) {
    try {
      const fans = await adminService.getAll();
      res.json(fans);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Lấy người hâm mộ theo maNguoiDung
  async getById(req, res) {
    try {
      const fan = await adminService.getByMaNguoiDung(req.params.maNguoiDung);
      if (!fan) return res.status(404).json({ message: 'Không tìm thấy người hâm mộ' });
      res.json(fan);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Cập nhật người hâm mộ theo maNguoiDung
  async update(req, res) {
    try {
      const updated = await adminService.updateByMaNguoiDung(req.params.maNguoiDung, req.body);
      if (!updated) return res.status(404).json({ message: 'Không tìm thấy người hâm mộ' });
      res.json({ message: 'Cập nhật thành công', data: updated });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new AdminController();
