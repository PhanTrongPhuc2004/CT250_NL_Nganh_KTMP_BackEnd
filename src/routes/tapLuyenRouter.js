const express = require('express');
const router = express.Router();
const LichTapLuyenController = require('../controller/TapLuyenController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, LichTapLuyenController.createTapLuyen);
router.get('/', LichTapLuyenController.getAllTapLuyen);
router.get('/:ma', LichTapLuyenController.getTapLuyenById);
router.put('/:ma', authMiddleware, LichTapLuyenController.updateTapLuyen);
router.delete('/:ma', authMiddleware, LichTapLuyenController.deleteTapLuyen);

module.exports = router;