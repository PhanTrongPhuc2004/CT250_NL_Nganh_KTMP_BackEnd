const DonHang = require("../models/DonHang.model");

const DonHangService = {
  // Thêm đơn hàng mới
  async taoDonHang(data) {
    const donHang = new DonHang(data);
    return await donHang.save();
  },

  // Lấy tất cả đơn hàng của 1 user
  async layDonHangTheoUser(username) {
    return await DonHang.find({ tenDangNhap: username }).sort({ date: -1 });

  },

  // Lấy toàn bộ đơn hàng (dành cho admin)
  async layTatCaDonHang() {
    return await DonHang.find().sort({ date: -1 });
  },
};

module.exports = DonHangService;
