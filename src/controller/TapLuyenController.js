// src/controller/LichTapLuyenController.js
const lichTapService = require('../services/tapLuyenService');

class LichTapLuyenController {
  async createLichTap(req, res) {
    try {
      const data = req.body;
      const lich = await lichTapService.createLichTap(data);
      res.status(201).json({ message: 'Tạo lịch tập thành công', data: lich });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllLichTap(req, res) {
    try {
      const list = await lichTapService.getAllLichTap();
      res.json(list);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async getLichTapByMa(req, res) {
    try {
      const { maLichTapLuyen } = req.params;
      const lich = await lichTapService.getLichTapByMa(maLichTapLuyen);
      if (!lich) return res.status(404).json({ message: 'Không tìm thấy' });
      res.json(lich);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async getLichTapById(req, res) {
    try {
      const { id } = req.params;
      const lich = await lichTapService.getLichTapById(id);
      if (!lich) return res.status(404).json({ message: 'Không tìm thấy' });
      res.json(lich);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async updateLichTapByMa(req, res) {
    try {
      const { maLichTapLuyen } = req.params;
      const data = req.body;
      const updated = await lichTapService.updateLichTapByMa(maLichTapLuyen, data);
      if (!updated) return res.status(404).json({ message: 'Không tìm thấy' });
      res.json({ message: 'Cập nhật thành công', data: updated });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async updateLichTapById(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updated = await lichTapService.updateLichTapById(id, data);
      if (!updated) return res.status(404).json({ message: 'Không tìm thấy' });
      res.json({ message: 'Cập nhật thành công', data: updated });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async deleteLichTapByMa(req, res) {
    try {
      const { maLichTapLuyen } = req.params;
      const deleted = await lichTapService.deleteLichTapByMa(maLichTapLuyen);
      if (!deleted) return res.status(404).json({ message: 'Không tìm thấy' });
      res.json({ message: 'Xóa thành công' });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async deleteLichTapById(req, res) {
    try {
      const { id } = req.params;
      const deleted = await lichTapService.deleteLichTapById(id);
      if (!deleted) return res.status(404).json({ message: 'Không tìm thấy' });
      res.json({ message: 'Xóa thành công' });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }
}

module.exports = new LichTapLuyenController();