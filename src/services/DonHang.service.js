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

  async xoaDonHang(id) {
    const deleted = await DonHang.findByIdAndDelete(id);
    return deleted;
  },

  // Cập nhật trạng thái đơn hàng
  async capNhatTrangThai(id, status) {
    return await DonHang.findByIdAndUpdate(id, { status }, { new: true });
  },
    // Thống kê doanh thu
  async thongKeDoanhThu(option = "daily") {
    const match = { status: "Đã xác nhận" };

    // Lấy dữ liệu từ MongoDB, group theo option
    const groupFormat = {
      daily: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
      weekly: { $dateToString: { format: "%Y-%U", date: "$date" } }, // %U = tuần
      monthly: { $dateToString: { format: "%Y-%m", date: "$date" } },
    };

    const groupKey = groupFormat[option] || groupFormat.daily;

    const result = await DonHang.aggregate([
      { $match: match },
      {
        $group: {
          _id: groupKey,
          totalRevenue: { $sum: "$total" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Đổi tên key để frontend dễ dùng
    return result.map(r => ({ label: r._id, value: r.totalRevenue }));
  },
  async thongKeTheoSanPham() {
    // Chỉ lấy các đơn hàng đã xác nhận
    const match = { status: "Đã xác nhận" };

    // Unwind cart để tách từng sản phẩm trong đơn hàng
    const result = await DonHang.aggregate([
      { $match: match },
      { $unwind: "$cart" },
      {
        $group: {
          _id: "$cart.tenQuaLuuNiem",
          totalQuantity: { $sum: "$cart.quantity" },
          totalRevenue: { $sum: { $multiply: ["$cart.quantity", "$cart.gia"] } }
        }
      },
      { $sort: { totalRevenue: -1 } }
    ]);

    // Đổi key cho frontend dễ dùng
    return result.map(r => ({
      product: r._id,
      quantity: r.totalQuantity,
      revenue: r.totalRevenue
    }));
  }
};

module.exports = DonHangService;
