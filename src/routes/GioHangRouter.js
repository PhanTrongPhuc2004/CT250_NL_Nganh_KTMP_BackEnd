const express = require("express");
const router = express.Router();
const GioHangController = require("../controller/GioHangController");

// Lấy giỏ hàng
router.get("/:tenDangNhap", GioHangController.getCart);

// Thêm sản phẩm
router.post("/add", GioHangController.addItem);

// Lưu giỏ hàng
router.post("/save", GioHangController.saveCart);

// Xóa sản phẩm
router.delete("/:tenDangNhap/:maSanPham", GioHangController.removeItem);

// Xóa toàn bộ giỏ hàng
router.delete("/clear/:tenDangNhap", GioHangController.clearCart);

module.exports = router;
