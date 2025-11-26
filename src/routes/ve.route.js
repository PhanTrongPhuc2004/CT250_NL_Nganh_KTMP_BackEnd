// src/routes/ve.route.js (ĐÃ SỬA HOÀN CHỈNH)
const express = require('express');
const router = express.Router();
const VeController = require('../controller/VeController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// === MUA VÉ ===
router.post('/mua', authMiddleware, roleMiddleware('nguoihammo'), VeController.muaVe);                    
router.post('/mua-nhieu', authMiddleware, roleMiddleware('nguoihammo'), VeController.muaNhieuVe);      

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

// THỐNG KÊ DOANH THU
router.get('/thongke', authMiddleware, roleMiddleware('admin'), VeController.thongKeDoanhThu);
router.get('/thongke/top', authMiddleware, roleMiddleware('admin'), VeController.topMatchesInMuaGiai);

module.exports = router;