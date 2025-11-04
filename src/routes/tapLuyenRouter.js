// src/routes/lichtap.route.js
const express = require('express');
const router = express.Router();
const LichTapLuyenController = require('../controller/TapLuyenController');
const authMiddleware = require('../middlewares/authMiddleware');

// [POST] /lichtap - Tạo lịch tập
router.post('/', authMiddleware, LichTapLuyenController.createLichTap);

// [GET] /lichtap - Lấy tất cả lịch tập
router.get('/', LichTapLuyenController.getAllLichTap);

// [GET] /lichtap/ma/:maLichTapLuyen - Lấy theo mã
router.get('/ma/:maLichTapLuyen', LichTapLuyenController.getLichTapByMa);

// [GET] /lichtap/id/:id - Lấy theo _id
router.get('/id/:id', LichTapLuyenController.getLichTapById);

// [PUT] /lichtap/ma/:maLichTapLuyen - Cập nhật theo mã
router.put('/ma/:maLichTapLuyen', authMiddleware, LichTapLuyenController.updateLichTapByMa);

// [PUT] /lichtap/id/:id - Cập nhật theo _id
router.put('/id/:id', authMiddleware, LichTapLuyenController.updateLichTapById);

// [DELETE] /lichtap/ma/:maLichTapLuyen - Xóa theo mã
router.delete('/ma/:maLichTapLuyen', authMiddleware, LichTapLuyenController.deleteLichTapByMa);

// [DELETE] /lichtap/id/:id - Xóa theo _id
router.delete('/id/:id', authMiddleware, LichTapLuyenController.deleteLichTapById);

module.exports = router;