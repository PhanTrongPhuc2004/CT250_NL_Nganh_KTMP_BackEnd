// src/routes/ve.route.js
const express = require('express');
const router = express.Router();
const VeController = require('../controller/VeController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// MUA VÉ – CHỈ NGƯỜI HÂM MỘ
router.post('/mua', authMiddleware, roleMiddleware('nguoihammo'), VeController.muaVe);

// ADMIN: QUẢN LÝ VÉ
router.get('/', authMiddleware, roleMiddleware('admin'), VeController.getAllVe);
router.get('/trandau/:maTranDau', authMiddleware, roleMiddleware('admin'), VeController.getVeByMaTranDau);
router.put('/ma/:maVe', authMiddleware, roleMiddleware('admin'), VeController.updateVeByMa);
router.put('/id/:id', authMiddleware, roleMiddleware('admin'), VeController.updateVeById);
router.delete('/ma/:maVe', authMiddleware, roleMiddleware('admin'), VeController.deleteVeByMa);
router.delete('/id/:id', authMiddleware, roleMiddleware('admin'), VeController.deleteVeById);

// NGƯỜI DÙNG: XEM VÉ CỦA MÌNH
router.get('/user', authMiddleware, VeController.getVeByUser);
router.get('/ma/:maVe', authMiddleware, VeController.getVeByMa);
router.get('/id/:id', authMiddleware, VeController.getVeById);

module.exports = router;