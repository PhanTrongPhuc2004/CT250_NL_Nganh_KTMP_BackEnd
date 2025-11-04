// src/routes/giaidau.route.js
const express = require('express');
const router = express.Router();
const GiaiDauController = require('../controller/GiaiDauController');
const authMiddleware = require('../middlewares/authMiddleware');

// [POST] /giaidau - Tạo giải đấu
router.post('/', authMiddleware, GiaiDauController.createGiaiDau);

// [GET] /giaidau - Lấy tất cả giải đấu
router.get('/', GiaiDauController.getAllGiaiDau);

// [GET] /giaidau/ma/:maGiaiDau - Lấy theo mã
router.get('/ma/:maGiaiDau', GiaiDauController.getGiaiDauByMa);

// [GET] /giaidau/id/:id - Lấy theo _id
router.get('/id/:id', GiaiDauController.getGiaiDauById);

// [PUT] /giaidau/ma/:maGiaiDau - Cập nhật theo mã
router.put('/ma/:maGiaiDau', authMiddleware, GiaiDauController.updateGiaiDauByMa);

// [PUT] /giaidau/id/:id - Cập nhật theo _id
router.put('/id/:id', authMiddleware, GiaiDauController.updateGiaiDauById);

// [DELETE] /giaidau/ma/:maGiaiDau - Xóa theo mã
router.delete('/ma/:maGiaiDau', authMiddleware, GiaiDauController.deleteGiaiDauByMa);

// [DELETE] /giaidau/id/:id - Xóa theo _id
router.delete('/id/:id', authMiddleware, GiaiDauController.deleteGiaiDauById);

module.exports = router;