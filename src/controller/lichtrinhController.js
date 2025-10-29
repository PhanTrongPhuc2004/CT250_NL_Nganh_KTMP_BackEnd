const lichTrinhService = require('../services/lichtrinhService');

class LichTrinhController {
  async createLichTrinh(req, res) {
    try {
      const data = req.body;
      const lich = await lichTrinhService.createLichTrinh(data);
      res.status(201).json({ message: 'Tạo lịch thành công', data: lich });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllLichTrinh(req, res) {
    try {
      const list = await lichTrinhService.getAllLichTrinh();
      res.json(list);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async getLichTrinhById(req, res) {
    try {
      const { ma } = req.params;
      const lich = await lichTrinhService.getLichTrinhByMa(ma);
      if (!lich) return res.status(404).json({ message: 'Không tìm thấy' });
      res.json(lich);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async updateLichTrinh(req, res) {
    try {
      const { ma } = req.params;
      const data = req.body;
      const updated = await lichTrinhService.updateLichTrinh(ma, data);
      if (!updated) return res.status(404).json({ message: 'Không tìm thấy' });
      res.json({ message: 'Cập nhật thành công', data: updated });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async deleteLichTrinh(req, res) {
    try {
      const { ma } = req.params;
      const deleted = await lichTrinhService.deleteLichTrinh(ma);
      if (!deleted) return res.status(404).json({ message: 'Không tìm thấy' });
      res.json({ message: 'Xóa thành công' });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }
}

module.exports = new LichTrinhController();