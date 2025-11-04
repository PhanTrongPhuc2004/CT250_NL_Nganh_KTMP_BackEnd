// src/routes/trandau.route.js
const express = require('express');
const router = express.Router();
const TranDauController = require('../controller/TranDauController');
const authMiddleware = require('../middlewares/authMiddleware');

// [POST] /trandau - Tạo trận đấu
router.post('/', authMiddleware, TranDauController.createTranDau);

// [GET] /trandau - Lấy tất cả trận đấu
router.get('/', TranDauController.getAllTranDau);

// [GET] /trandau/ma/:maTranDau - Lấy theo mã
router.get('/ma/:maTranDau', TranDauController.getTranDauByMa);

// [GET] /trandau/id/:id - Lấy theo _id
router.get('/id/:id', TranDauController.getTranDauById);

// [PUT] /trandau/ma/:maTranDau - Cập nhật theo mã
router.put('/ma/:maTranDau', authMiddleware, TranDauController.updateTranDauByMa);

// [PUT] /trandau/id/:id - Cập nhật theo _id
router.put('/id/:id', authMiddleware, TranDauController.updateTranDauById);

// [DELETE] /trandau/ma/:maTranDau - Xóa theo mã
router.delete('/ma/:maTranDau', authMiddleware, TranDauController.deleteTranDauByMa);

// [DELETE] /trandau/id/:id - Xóa theo _id
router.delete('/id/:id', authMiddleware, TranDauController.deleteTranDauById);

// [GET] /trandau/:maTranDau/lichtap - Lấy lịch tập theo trận
router.get('/:maTranDau/lichtap', TranDauController.getLichTapByMaTranDau);

// [GET] /trandau/:maTranDau/full - Lấy full thông tin trận + lịch tập
router.get('/:maTranDau/full', TranDauController.getFullTranDau);

module.exports = router;