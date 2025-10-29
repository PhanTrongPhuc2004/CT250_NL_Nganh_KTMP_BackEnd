const express = require('express');
const router = express.Router();
const TranDauController = require('../controller/TranDauController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, TranDauController.createTranDau);
router.get('/', TranDauController.getAllTranDaus);
router.get('/:ma', TranDauController.getTranDauById);
router.put('/:ma', authMiddleware, TranDauController.updateTranDau);
router.delete('/:ma', authMiddleware, TranDauController.deleteTranDau);
router.get('/:ma/lichtap', TranDauController.getLichTapByTranDauId);
router.get('/:ma/full', TranDauController.getFullTranDau);

module.exports = router;