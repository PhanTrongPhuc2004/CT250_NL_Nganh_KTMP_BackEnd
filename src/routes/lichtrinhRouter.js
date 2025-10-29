const express = require('express');
const router = express.Router();
const LichTrinhController = require('../controller/LichTrinhController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, LichTrinhController.createLichTrinh);
router.get('/', LichTrinhController.getAllLichTrinh);
router.get('/:ma', LichTrinhController.getLichTrinhById);
router.put('/:ma', authMiddleware, LichTrinhController.updateLichTrinh);
router.delete('/:ma', authMiddleware, LichTrinhController.deleteLichTrinh);

module.exports = router;