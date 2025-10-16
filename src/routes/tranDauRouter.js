const express = require('express');
const router = express.Router();
const TranDauController = require('../controller/TranDauController');

router.post('/', TranDauController.createTranDau);
router.get('/', TranDauController.getAllTranDaus);
router.get('/:id', TranDauController.getTranDauById);
router.put('/:id', TranDauController.updateTranDau);
router.delete('/:id', TranDauController.deleteTranDau);
router.get('/:id/lichtap', TranDauController.getLichTapByTranDauId);
router.get('/:id/full', TranDauController.getFullTranDau);

module.exports = router;
