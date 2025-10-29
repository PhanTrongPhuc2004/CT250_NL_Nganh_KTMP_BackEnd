const DonHangService = require("../services/DonHang.service");

const DonHangController = {
  // POST /donhang
  async taoDonHang(req, res) {
    try {
      const donHangMoi = await DonHangService.taoDonHang(req.body);
      res.status(201).json(donHangMoi);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Lỗi khi tạo đơn hàng!" });
    }
  },

  // GET /donhang/:username
  async layDonHangTheoUser(req, res) {
    try {
      const { username } = req.params;
      const donHangs = await DonHangService.layDonHangTheoUser(username);
      res.json(donHangs);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Lỗi khi lấy đơn hàng!" });
    }
  },

  // GET /donhang (dành cho admin)
  async layTatCaDonHang(req, res) {
    try {
      const donHangs = await DonHangService.layTatCaDonHang();
      res.json(donHangs);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Lỗi khi lấy tất cả đơn hàng!" });
    }
  },
};

module.exports = DonHangController;
