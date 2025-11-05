// src/routes/trandau.route.js
const express = require('express');
const router = express.Router();
const TranDauController = require('../controller/TranDauController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/', authMiddleware, roleMiddleware('admin'), TranDauController.createTranDau);
router.get('/', authMiddleware, TranDauController.getAllTranDau);
router.get('/ma/:maTranDau', authMiddleware, TranDauController.getTranDauByMa);
router.get('/id/:id', authMiddleware, TranDauController.getTranDauById);
router.put('/ma/:maTranDau', authMiddleware, roleMiddleware('admin'), TranDauController.updateTranDauByMa);
router.put('/id/:id', authMiddleware, roleMiddleware('admin'), TranDauController.updateTranDauById);
router.delete('/ma/:maTranDau', authMiddleware, roleMiddleware('admin'), TranDauController.deleteTranDauByMa);
router.delete('/id/:id', authMiddleware, roleMiddleware('admin'), TranDauController.deleteTranDauById);

router.get('/:maTranDau/lichtap', authMiddleware, TranDauController.getLichTapByMaTranDau);
router.get('/:maTranDau/full', authMiddleware, TranDauController.getFullTranDau);

module.exports = router;