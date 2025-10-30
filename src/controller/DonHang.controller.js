const DonHangService = require("../services/DonHang.service");

const DonHangController = {
  // POST /donhang - tạo đơn hàng mới
  async taoDonHang(req, res) {
    try {
      const donHangMoi = await DonHangService.taoDonHang(req.body);
      res.status(201).json(donHangMoi);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Lỗi khi tạo đơn hàng!" });
    }
  },

  // PUT /donhang/:id - cập nhật trạng thái đơn hàng
  async capNhatTrangThai(req, res) {
    try {
      const { status } = req.body;
      const order = await DonHangService.capNhatTrangThai(req.params.id, status);
      if (!order) return res.status(404).json({ message: "Không tìm thấy đơn hàng!" });
      res.json(order);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Lỗi server!" });
    }
  },

  // GET /donhang/:tenDangNhap - lấy đơn hàng của người dùng
  async layDonHangTheoUser(req, res) {
    try {
      const { tenDangNhap } = req.params;
      const donHangs = await DonHangService.layDonHangTheoUser(tenDangNhap);
      res.json(donHangs);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Lỗi khi lấy đơn hàng!" });
    }
  },

  // GET /donhang - admin lấy tất cả đơn hàng
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
