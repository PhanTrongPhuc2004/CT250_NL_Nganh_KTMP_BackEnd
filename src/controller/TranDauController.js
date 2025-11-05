// src/controller/TranDauController.js
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

  async getAllTranDau(req, res) {
    try {
      const list = await tranDauService.getAllTranDau();
      res.json(list);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async getTranDauByMa(req, res) {
    try {
      const { maTranDau } = req.params;
      const tranDau = await tranDauService.getTranDauByMa(maTranDau);
      if (!tranDau) return res.status(404).json({ message: 'Không tìm thấy' });
      res.json(tranDau);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async getTranDauById(req, res) {
    try {
      const { id } = req.params;
      const tranDau = await tranDauService.getTranDauById(id);
      if (!tranDau) return res.status(404).json({ message: 'Không tìm thấy' });
      res.json(tranDau);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async updateTranDauByMa(req, res) {
    try {
      const { maTranDau } = req.params;
      const data = req.body;
      const updated = await tranDauService.updateTranDauByMa(maTranDau, data);
      if (!updated) return res.status(404).json({ message: 'Không tìm thấy' });
      res.json({ message: 'Cập nhật thành công', data: updated });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async updateTranDauById(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updated = await tranDauService.updateTranDauById(id, data);
      if (!updated) return res.status(404).json({ message: 'Không tìm thấy' });
      res.json({ message: 'Cập nhật thành công', data: updated });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async deleteTranDauByMa(req, res) {
    try {
      const { maTranDau } = req.params;
      const deleted = await tranDauService.deleteTranDauByMa(maTranDau);
      if (!deleted) return res.status(404).json({ message: 'Không tìm thấy' });
      res.json({ message: 'Xóa thành công' });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async deleteTranDauById(req, res) {
    try {
      const { id } = req.params;
      const deleted = await tranDauService.deleteTranDauById(id);
      if (!deleted) return res.status(404).json({ message: 'Không tìm thấy' });
      res.json({ message: 'Xóa thành công' });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async getLichTapByMaTranDau(req, res) {
    try {
      const { maTranDau } = req.params;
      const lichList = await LichTapLuyen.find({ maTranDau }).populate('maDoiBong', 'tenDoiBong');
      res.json(lichList);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async getFullTranDau(req, res) {
    try {
      const { maTranDau } = req.params;
      const tranDau = await tranDauService.getTranDauByMa(maTranDau);
      if (!tranDau) return res.status(404).json({ message: 'Không tìm thấy' });

      const lichTap = await LichTapLuyen.find({ maTranDau }).populate('maDoiBong', 'tenDoiBong');
      res.json({ ...tranDau.toObject(), lichTapLuyen: lichTap });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }
}

module.exports = new TranDauController();