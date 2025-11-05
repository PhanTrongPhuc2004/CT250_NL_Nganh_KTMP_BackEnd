// src/routes/lichtap.route.js
const express = require('express');
const router = express.Router();
const LichTapLuyenController = require('../controller/TapLuyenController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/', authMiddleware, roleMiddleware('admin'), LichTapLuyenController.createLichTap);
router.get('/', authMiddleware, LichTapLuyenController.getAllLichTap);
router.get('/ma/:maLichTapLuyen', authMiddleware, LichTapLuyenController.getLichTapByMa);
router.get('/id/:id', authMiddleware, LichTapLuyenController.getLichTapById);
router.put('/ma/:maLichTapLuyen', authMiddleware, roleMiddleware('admin'), LichTapLuyenController.updateLichTapByMa);
router.put('/id/:id', authMiddleware, roleMiddleware('admin'), LichTapLuyenController.updateLichTapById);
router.delete('/ma/:maLichTapLuyen', authMiddleware, roleMiddleware('admin'), LichTapLuyenController.deleteLichTapByMa);
router.delete('/id/:id', authMiddleware, roleMiddleware('admin'), LichTapLuyenController.deleteLichTapById);

module.exports = router;