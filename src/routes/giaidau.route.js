// src/routes/giaidau.route.js
const express = require('express');
const router = express.Router();
const GiaiDauController = require('../controller/GiaiDauController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/', authMiddleware, roleMiddleware('admin'), GiaiDauController.createGiaiDau);
router.get('/', authMiddleware, GiaiDauController.getAllGiaiDau);
router.get('/ma/:maGiaiDau', authMiddleware, GiaiDauController.getGiaiDauByMa);
router.get('/id/:id', authMiddleware, GiaiDauController.getGiaiDauById);
router.put(
  '/ma/:maGiaiDau',
  authMiddleware,
  roleMiddleware('admin'),
  GiaiDauController.updateGiaiDauByMa
);
router.put('/id/:id', authMiddleware, roleMiddleware('admin'), GiaiDauController.updateGiaiDauById);
router.delete(
  '/ma/:maGiaiDau',
  authMiddleware,
  roleMiddleware('admin'),
  GiaiDauController.deleteGiaiDauByMa
);
router.delete(
  '/id/:id',
  authMiddleware,
  roleMiddleware('admin'),
  GiaiDauController.deleteGiaiDauById
);
router.get('/id/:id/muagiai', authMiddleware, GiaiDauController.getMuaGiaiByGiaiDauId);

module.exports = router;
