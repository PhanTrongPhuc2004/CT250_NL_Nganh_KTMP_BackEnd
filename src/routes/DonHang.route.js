const express = require("express");
const router = express.Router();
const DonHangController = require("../controller/DonHang.controller");

// Tạo đơn hàng
router.post("/", DonHangController.taoDonHang);

// Lấy đơn hàng theo username
router.get("/:username", DonHangController.layDonHangTheoUser);

// (Tuỳ chọn) Lấy tất cả đơn hàng (Admin)
router.get("/", DonHangController.layTatCaDonHang);

module.exports = router;
