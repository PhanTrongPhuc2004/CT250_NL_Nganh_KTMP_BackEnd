// src/routes/ve.route.js
const express = require('express');
const router = express.Router();
const VeController = require('../controller/VeController'); // Đảm bảo đúng tên folder (controllers)
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// === MUA VÉ (người hâm mộ) ===
router.post('/mua', authMiddleware, roleMiddleware('nguoihammo'), VeController.muaVe);
router.post('/mua-nhieu', authMiddleware, roleMiddleware('nguoihammo'), VeController.muaNhieuVe);

// === NGƯỜI DÙNG XEM VÉ CỦA MÌNH ===
router.get('/user', authMiddleware, VeController.getVeByUser);
router.get('/ma/:maVe', authMiddleware, VeController.getVeByMa);
router.get('/id/:id', authMiddleware, VeController.getVeById);

// === ADMIN: QUẢN LÝ TẤT CẢ VÉ ===
router.get('/', authMiddleware, roleMiddleware('admin'), VeController.getAllVe);
router.get('/trandau/:maTranDau', authMiddleware, roleMiddleware('admin'), VeController.getVeByMaTranDau);

// === ADMIN: XÁC NHẬN THANH TOÁN ===
router.get('/cho-xac-nhan', authMiddleware, roleMiddleware('admin'), VeController.getVeChoXacNhan);
router.put('/xac-nhan-thanh-toan', authMiddleware, roleMiddleware('admin'), VeController.xacNhanThanhToan);

// === ADMIN: QUẢN LÝ TỔNG HỢP TẤT CẢ VÉ ĐÃ MUA ===
router.get('/da-thanh-toan', authMiddleware, roleMiddleware('admin'), VeController.getAllPurchasedTickets);

// === CỔNG CHECK-IN (quét QR vào sân) ===
router.put('/checkin/:maVe', VeController.checkInVe); // Có thể thêm auth riêng sau

// === CẬP NHẬT / XÓA VÉ (ADMIN) ===
router.put('/ma/:maVe', authMiddleware, roleMiddleware('admin'), VeController.updateVeByMa);
router.put('/id/:id', authMiddleware, roleMiddleware('admin'), VeController.updateVeById);
router.delete('/ma/:maVe', authMiddleware, roleMiddleware('admin'), VeController.deleteVeByMa);
router.delete('/id/:id', authMiddleware, roleMiddleware('admin'), VeController.deleteVeById);

// === THỐNG KÊ DOANH THU ===
router.get('/thongke', authMiddleware, roleMiddleware('admin'), VeController.thongKeDoanhThu);
router.get('/thongke/top', authMiddleware, roleMiddleware('admin'), VeController.topMatchesInMuaGiai);

module.exports = router;