const express = require('express');
const router = express.Router();
const ThongBaoController = require('../controller/ThongBaoController');
const authMiddleware = require('../middlewares/authMiddleware');

// Gửi thông báo (Admin/HLV)
router.post('/', authMiddleware, ThongBaoController.guiThongBao);

// Lấy thông báo
router.get('/gan-nhat', authMiddleware, ThongBaoController.layThongBaoGanNhat);
router.get('/tat-ca', authMiddleware, ThongBaoController.layTatCaThongBao);

// Đánh dấu đọc
router.put('/:maThongBao/doc', authMiddleware, ThongBaoController.danhDauDaDoc);
router.put('/tat-ca/doc', authMiddleware, ThongBaoController.danhDauTatCaDaDoc);

// Đếm chưa đọc
router.get('/dem-chua-doc', authMiddleware, ThongBaoController.demThongBaoChuaDoc);

module.exports = router;