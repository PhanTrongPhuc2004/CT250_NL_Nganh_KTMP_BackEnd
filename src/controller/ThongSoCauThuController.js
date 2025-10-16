const thongSoCauThuService = require('../services/thongSoCauThuService');

class ThongSoCauThuController {
  //[POST] thongsocauthu/
  async createThongSoCauThu(req, res) {
    try {
      const thongSoCauThu = await thongSoCauThuService.createThongSoCauThu(req.body);
      res.status(201).json(thongSoCauThu);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  //[GET] thongsocauthu/
  async getAllThongSoCauThu(req, res) {
    try {
      const thongSoCauThus = await thongSoCauThuService.getAllThongSoCauThu();
      res.status(200).json(thongSoCauThus);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  //[GET] thongsocauthu/:id
  async getThongSoCauThuById(req, res) {
    try {
      const thongSoCauThu = await thongSoCauThuService.getThongSoCauThuById(req.params.id);
      res.status(200).json(thongSoCauThu);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  //[PUT] thongsocauthu/:id
  async updateThongSoCauThu(req, res) {
    try {
      const updatedThongSoCauThu = await thongSoCauThuService.updateThongSoCauThu(
        req.params.id,
        req.body
      );
      res.status(200).json(updatedThongSoCauThu);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  //[DELETE] thongsocauthu/:id
  async deleteThongSoCauThu(req, res) {
    try {
      await thongSoCauThuService.deleteThongSoCauThu(req.params.id);
      res.status(200).json({ message: 'ThongSoCauThu deleted successfully' });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
}
module.exports = new ThongSoCauThuController();
