// src/routes/tapLuyenRouter.js
const express = require('express');
const router = express.Router();
const LichTapLuyenController = require('../controller/TapLuyenController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/', authMiddleware, roleMiddleware('admin','huanluyenvien'), LichTapLuyenController.createLichTap);
router.get('/', authMiddleware, LichTapLuyenController.getAllLichTap);
router.get('/ma/:maLichTapLuyen', authMiddleware, LichTapLuyenController.getLichTapByMa);
router.get('/id/:id', authMiddleware, LichTapLuyenController.getLichTapById);
router.put('/ma/:maLichTapLuyen', authMiddleware, roleMiddleware('admin', 'huanluyenvien'), LichTapLuyenController.updateLichTapByMa);
router.put('/id/:id', authMiddleware, roleMiddleware('admin', 'huanluyenvien'), LichTapLuyenController.updateLichTapById);
router.delete('/ma/:maLichTapLuyen', authMiddleware, roleMiddleware('admin', 'huanluyenvien'), LichTapLuyenController.deleteLichTapByMa);
router.delete('/id/:id', authMiddleware, roleMiddleware('admin', 'huanluyenvien'), LichTapLuyenController.deleteLichTapById);

module.exports = router;