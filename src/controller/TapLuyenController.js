const tapLuyenService = require('../services/tapLuyenService');

class TapLuyenController {
  // [POST] api/tapluyen
  async createTapLuyen(req, res) {
    try {
      const newTapLuyen = await tapLuyenService.createTapLuyen(req.body);
      res.status(201).json(newTapLuyen);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // [GET] api/tapluyen
  async getAllTapLuyen(req, res) {
    try {
      const tapLuyenList = await tapLuyenService.getAllTapLuyen();
      res.status(200).json(tapLuyenList);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // [GET] api/tapluyen/:id
  async getTapLuyenById(req, res) {
    try {
      const tapLuyen = await tapLuyenService.getTapLuyenById(req.params.id);
      if (!tapLuyen) {
        return res.status(404).json({ message: 'Buổi tập luyện không tìm thấy' });
      }
      res.status(200).json(tapLuyen);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // [PUT] api/tapluyen/:id
  async updateTapLuyen(req, res) {
    try {
      const updatedTapLuyen = await tapLuyenService.updateTapLuyen(req.params.id, req.body);
      if (!updatedTapLuyen) {
        return res.status(404).json({ message: 'Buổi tập luyện không tìm thấy' });
      }
      res.status(200).json(updatedTapLuyen);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // [DELETE] api/tapluyen/:id
  async deleteTapLuyen(req, res) {
    try {
      const deletedTapLuyen = await tapLuyenService.deleteTapLuyen(req.params.id);
      if (!deletedTapLuyen) {
        res.json({ message: 'Xóa thất bại' });
      } else {
        res.json({ message: 'Xóa thành công' });
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new TapLuyenController();
