const DonHang = require("../models/DonHang.model");

const DonHangService = {
  // Tạo đơn hàng mới
  async taoDonHang(data) {
    const donHang = new DonHang(data);
    return await donHang.save();
  },

  // Lấy tất cả đơn hàng của 1 user (theo tenDangNhap)
  async layDonHangTheoUser(tenDangNhap) {
    return await DonHang.find({ tenDangNhap }).sort({ date: -1 });
  },

  // Lấy toàn bộ đơn hàng (admin)
  async layTatCaDonHang() {
    return await DonHang.find().sort({ date: -1 });
  },

  // Cập nhật trạng thái đơn hàng
  async capNhatTrangThai(id, status) {
    return await DonHang.findByIdAndUpdate(id, { status }, { new: true });
  },
};

module.exports = DonHangService;
