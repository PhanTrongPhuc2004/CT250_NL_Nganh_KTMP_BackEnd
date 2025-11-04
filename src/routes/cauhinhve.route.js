// src/routes/cauhinhve.route.js
const express = require('express');
const router = express.Router();
const CauHinhVeController = require('../controller/CauHinhVeController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// [POST] /cauhinhve - Tạo cấu hình vé
router.post('/',
    authMiddleware,
    roleMiddleware('admin'), // Dùng đúng: roleMiddleware('admin')
    CauHinhVeController.create
);

// [GET] /cauhinhve - Lấy tất cả cấu hình vé
router.get('/ma/:ma',
    authMiddleware,
    roleMiddleware('admin', 'quanly'), // Nhiều role
    CauHinhVeController.getByMa
);

// [PUT] /cauhinhve - Cập nhật cấu hình vé
router.put('/ma/:ma',
    authMiddleware,
    roleMiddleware('admin'),
    CauHinhVeController.updateByMa
);

// [DELETE] /cauhinhve - Xóa cấu hình vé
router.delete('/ma/:ma',
    authMiddleware,
    roleMiddleware('admin'),
    CauHinhVeController.deleteByMa
);

// [GET] /cauhinhve/id/:id - Lấy cấu hình vé theo ID
router.get('/id/:id',
    authMiddleware,
    roleMiddleware('admin', 'quanly'),
    CauHinhVeController.getById
);

// [PUT] /cauhinhve/id/:id - Cập nhật cấu hình vé theo ID
router.put('/id/:id',
    authMiddleware,
    roleMiddleware('admin'),
    CauHinhVeController.updateById
);

// [DELETE] /cauhinhve/id/:id - Xóa cấu hình vé theo ID
router.delete('/id/:id',
    authMiddleware,
    roleMiddleware('admin'),
    CauHinhVeController.deleteById
);

// [GET] /cauhinhve/trandau/:maTranDau - Lấy cấu hình vé theo mã trận đấu Cho phép người hâm mộ xem (không cần admin)
router.get('/trandau/:maTranDau',
    authMiddleware,
    roleMiddleware('admin', 'quanly', 'nguoihammo'),
    CauHinhVeController.getByMaTranDau
);

module.exports = router;