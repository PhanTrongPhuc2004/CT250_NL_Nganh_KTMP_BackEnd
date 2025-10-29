const express = require('express');
const router = express.Router();
const GiaiDauController = require('../controller/GiaiDauController');
const authMiddleware = require('../middlewares/authMiddleware'); // Nếu cần phân quyền

router.post('/', authMiddleware, GiaiDauController.createGiaiDau);
router.get('/', GiaiDauController.getAllGiaiDau);
router.get('/:ma', GiaiDauController.getGiaiDauByMa);
router.put('/:ma', authMiddleware, GiaiDauController.updateGiaiDau);
router.delete('/:ma', authMiddleware, GiaiDauController.deleteGiaiDau);

module.exports = router;