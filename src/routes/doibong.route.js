// src/routes/doibong.route.js
const express = require('express');
const router = express.Router();
const DoiBongController = require('../controller/DoiBongController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/', authMiddleware, roleMiddleware('admin'), DoiBongController.createDoiBong);
router.get('/', authMiddleware, DoiBongController.getAllDoiBong);
router.get('/ma/:maDoiBong', authMiddleware, DoiBongController.getDoiBongByMa);
router.get('/id/:id', authMiddleware, DoiBongController.getDoiBongById);
router.put(
  '/ma/:maDoiBong',
  authMiddleware,
  roleMiddleware('admin'),
  DoiBongController.updateDoiBongByMa
);
router.put('/id/:id', authMiddleware, roleMiddleware('admin'), DoiBongController.updateDoiBongById);
router.delete(
  '/ma/:maDoiBong',
  authMiddleware,
  roleMiddleware('admin'),
  DoiBongController.deleteDoiBongByMa
);
router.delete(
  '/id/:id',
  authMiddleware,
  roleMiddleware('admin'),
  DoiBongController.deleteDoiBongById
);

module.exports = router;
