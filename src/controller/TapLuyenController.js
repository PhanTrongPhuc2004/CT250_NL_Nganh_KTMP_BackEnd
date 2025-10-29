const lichTapLuyenService = require('../services/tapLuyenService');

class LichTapLuyenController {
  async createTapLuyen(req, res) {
    try {
      const data = req.body;
      const lich = await lichTapLuyenService.createLichTapLuyen(data);
      res.status(201).json({ message: 'Tạo lịch tập thành công', data: lich });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllTapLuyen(req, res) {
    try {
      const list = await lichTapLuyenService.getAllLichTapLuyen();
      res.json(list);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async getTapLuyenById(req, res) {
    try {
      const { ma } = req.params;
      const lich = await lichTapLuyenService.getLichTapLuyenByMa(ma);
      if (!lich) return res.status(404).json({ message: 'Không tìm thấy' });
      res.json(lich);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async updateTapLuyen(req, res) {
    try {
      const { ma } = req.params;
      const data = req.body;
      const updated = await lichTapLuyenService.updateLichTapLuyen(ma, data);
      if (!updated) return res.status(404).json({ message: 'Không tìm thấy' });
      res.json({ message: 'Cập nhật thành công', data: updated });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async deleteTapLuyen(req, res) {
    try {
      const { ma } = req.params;
      const deleted = await lichTapLuyenService.deleteLichTapLuyen(ma);
      if (!deleted) return res.status(404).json({ message: 'Không tìm thấy' });
      res.json({ message: 'Xóa thành công' });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }
}

module.exports = new LichTapLuyenController();