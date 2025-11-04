const express = require("express");
const router = express.Router();
const gioHangController = require("../controller/GioHangController");

router.get("/:tenDangNhap", gioHangController.layGioHang);
router.post("/them", gioHangController.themVaoGio);
router.put("/:tenDangNhap/:maSanPham", gioHangController.capNhatSoLuong);
router.delete("/:tenDangNhap/:maSanPham", gioHangController.xoaMucHang);
router.delete("/xoa/:tenDangNhap", gioHangController.xoaTatCa);

module.exports = router;
