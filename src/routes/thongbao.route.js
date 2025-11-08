// src/routes/thongbao.route.js
const express = require('express');
const router = express.Router();
const ThongBaoController = require('../controller/ThongBaoController'); // ĐÚNG: controller (không phải controllers)
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Gửi thông báo (Admin/HLV)
router.post('/',
    authMiddleware,
    roleMiddleware('admin', 'huanluyenvien'),
    ThongBaoController.guiThongBao
);

// Lấy thông báo
router.get('/gan-nhat', authMiddleware, ThongBaoController.layThongBaoGanNhat);
router.get('/tat-ca', authMiddleware, ThongBaoController.layTatCaThongBao);

// Đánh dấu đọc
router.put('/:maThongBao/doc', authMiddleware, ThongBaoController.danhDauDaDoc);
router.put('/tat-ca/doc', authMiddleware, ThongBaoController.danhDauTatCaDaDoc);

// Đếm chưa đọc
router.get('/dem-chua-doc', authMiddleware, ThongBaoController.demThongBaoChuaDoc);

module.exports = router;