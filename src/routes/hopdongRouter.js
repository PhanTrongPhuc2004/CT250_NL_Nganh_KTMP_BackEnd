const express = require("express");
const router = express.Router();
const HopDongController = require("../controller/hopDongController");

// Lấy tất cả hợp đồng
router.get("/", HopDongController.getAll);

// Lấy hợp đồng theo ID
router.get("/:id", HopDongController.getById);

// Lấy hợp đồng theo trạng thái
router.get("/status/:trangThai", HopDongController.getByStatus);

// Tạo hợp đồng mới
router.post("/", HopDongController.create);

// Cập nhật hợp đồng
router.put("/:id", HopDongController.update);

// Xóa hợp đồng
router.delete("/:id", HopDongController.delete);

module.exports = router;
