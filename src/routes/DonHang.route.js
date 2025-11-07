const express = require("express");
const router = express.Router();
const DonHangController = require("../controller/DonHang.controller");

// Tạo đơn hàng
router.post("/", DonHangController.taoDonHang);

// Cập nhật trạng thái
router.put("/:id", DonHangController.capNhatTrangThai);

// Route cụ thể trước route dynamic
router.get("/thongke", DonHangController.thongKeDoanhThu);

// Lấy tất cả đơn hàng (admin)
router.get("/", DonHangController.layTatCaDonHang);

// Lấy đơn hàng của user theo tên đăng nhập (dynamic route cuối cùng)
router.get("/:tenDangNhap", DonHangController.layDonHangTheoUser);

// Route thống kê theo sản phẩm
router.get("/thongke/sanpham", DonHangController.thongKeTheoSanPham);


module.exports = router;
