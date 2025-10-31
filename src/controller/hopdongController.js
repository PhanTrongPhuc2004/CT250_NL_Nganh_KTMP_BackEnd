const HopDongService = require("../services/hopDongService");

const HopDongController = {
  async getAll(req, res) {
    try {
      const hopDongs = await HopDongService.getAll();
      res.status(200).json(hopDongs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const hopDong = await HopDongService.getById(req.params.id);
      if (!hopDong) return res.status(404).json({ message: "Không tìm thấy hợp đồng!" });
      res.status(200).json(hopDong);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async create(req, res) {
    try {
      const hopDong = await HopDongService.create(req.body);
      res.status(201).json(hopDong);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const hopDong = await HopDongService.update(req.params.id, req.body);
      res.status(200).json(hopDong);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const hopDong = await HopDongService.delete(req.params.id);
      res.status(200).json({ message: "Đã xóa hợp đồng thành công", hopDong });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getByStatus(req, res) {
    try {
      const { trangThai } = req.params;
      const hopDongs = await HopDongService.getByStatus(trangThai);
      res.status(200).json(hopDongs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = HopDongController;
