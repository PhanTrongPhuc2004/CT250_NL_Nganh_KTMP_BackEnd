const tranDauService = require('../services/tranDauService');
const LichTapLuyen = require('../models/TapLuyen.model');

class TranDauController {
  async createTranDau(req, res) {
    try {
      const data = req.body;
      const tranDau = await tranDauService.createTranDau(data);
      res.status(201).json({ message: 'Tạo trận đấu thành công', data: tranDau });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllTranDaus(req, res) {
    try {
      const list = await tranDauService.getAllTranDau();
      res.json(list);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async getTranDauById(req, res) {
    try {
      const { ma } = req.params;
      const tranDau = await tranDauService.getTranDauByMa(ma);
      if (!tranDau) return res.status(404).json({ message: 'Không tìm thấy' });
      res.json(tranDau);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async updateTranDau(req, res) {
    try {
      const { ma } = req.params;
      const data = req.body;
      const updated = await tranDauService.updateTranDau(ma, data);
      if (!updated) return res.status(404).json({ message: 'Không tìm thấy' });
      res.json({ message: 'Cập nhật thành công', data: updated });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async deleteTranDau(req, res) {
    try {
      const { ma } = req.params;
      const deleted = await tranDauService.deleteTranDau(ma);
      if (!deleted) return res.status(404).json({ message: 'Không tìm thấy' });
      res.json({ message: 'Xóa thành công' });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async getLichTapByTranDauId(req, res) {
    try {
      const { ma } = req.params;
      const lichList = await LichTapLuyen.find({ maTranDau: ma });
      res.json(lichList);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async getFullTranDau(req, res) {
    try {
      const { ma } = req.params;
      const tranDau = await tranDauService.getTranDauByMa(ma);
      if (!tranDau) return res.status(404).json({ message: 'Không tìm thấy' });
      const lichTap = await LichTapLuyen.find({ maTranDau: ma });
      res.json({ ...tranDau.toObject(), lichTapLuyen: lichTap });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }
}

module.exports = new TranDauController();