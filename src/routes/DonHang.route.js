const express = require("express");
const router = express.Router();
const DonHangController = require("../controller/DonHang.controller");

// Tạo đơn hàng
router.post("/", DonHangController.taoDonHang);

// Cập nhật trạng thái
router.put("/:id", DonHangController.capNhatTrangThai);

// Lấy đơn hàng của user theo tên đăng nhập
router.get("/:tenDangNhap", DonHangController.layDonHangTheoUser);

// Lấy tất cả đơn hàng (admin)
router.get("/", DonHangController.layTatCaDonHang);

module.exports = router;
