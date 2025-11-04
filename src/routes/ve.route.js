// src/routes/ve.route.js
const express = require('express');
const router = express.Router();
const VeController = require('../controller/VeController');
const authMiddleware = require('../middlewares/authMiddleware');

// [POST] /ve/mua - Mua vé
router.post('/mua', authMiddleware, VeController.muaVe);

// [GET] /ve - Lấy tất cả vé (admin)
router.get('/', authMiddleware, VeController.getAllVe);

// [GET] /ve/user - Lấy vé của user hiện tại
router.get('/user', authMiddleware, VeController.getVeByUser);

// [GET] /ve/ma/:maVe - Lấy theo mã vé
router.get('/ma/:maVe', authMiddleware, VeController.getVeByMa);

// [GET] /ve/id/:id - Lấy theo _id
router.get('/id/:id', authMiddleware, VeController.getVeById);

// [GET] /ve/trandau/:maTranDau - Lấy vé theo mã trận đấu
router.get('/trandau/:maTranDau', authMiddleware, VeController.getVeByMaTranDau);

// [PUT] /ve/ma/:maVe - Cập nhật theo mã
router.put('/ma/:maVe', authMiddleware, VeController.updateVeByMa);

// [PUT] /ve/id/:id - Cập nhật theo _id
router.put('/id/:id', authMiddleware, VeController.updateVeById);

// [DELETE] /ve/ma/:maVe - Xóa theo mã
router.delete('/ma/:maVe', authMiddleware, VeController.deleteVeByMa);

// [DELETE] /ve/id/:id - Xóa theo _id
router.delete('/id/:id', authMiddleware, VeController.deleteVeById);

module.exports = router;