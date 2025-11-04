// src/routes/doibong.route.js
const express = require('express');
const router = express.Router();
const DoiBongController = require('../controller/DoiBongController');
const authMiddleware = require('../middlewares/authMiddleware');

// [POST] /doibong - Tạo đội bóng
router.post('/', authMiddleware, DoiBongController.createDoiBong);

// [GET] /doibong - Lấy tất cả đội bóng
router.get('/', DoiBongController.getAllDoiBong);

// [GET] /doibong/ma/:maDoiBong - Lấy theo mã
router.get('/ma/:maDoiBong', DoiBongController.getDoiBongByMa);

// [GET] /doibong/id/:id - Lấy theo _id
router.get('/id/:id', DoiBongController.getDoiBongById);

// [PUT] /doibong/ma/:maDoiBong - Cập nhật theo mã
router.put('/ma/:maDoiBong', authMiddleware, DoiBongController.updateDoiBongByMa);

// [PUT] /doibong/id/:id - Cập nhật theo _id
router.put('/id/:id', authMiddleware, DoiBongController.updateDoiBongById);

// [DELETE] /doibong/ma/:maDoiBong - Xóa theo mã
router.delete('/ma/:maDoiBong', authMiddleware, DoiBongController.deleteDoiBongByMa);

// [DELETE] /doibong/id/:id - Xóa theo _id
router.delete('/id/:id', authMiddleware, DoiBongController.deleteDoiBongById);

module.exports = router;