// src/routes/muagiai.route.js
const express = require('express');
const router = express.Router();
const MuaGiaiController = require('../controller/MuaGiaiController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/', authMiddleware, roleMiddleware('admin'), MuaGiaiController.createMuaGiai);
router.get('/', authMiddleware, MuaGiaiController.getAllMuaGiai);
router.get('/ma/:maMuaGiai', authMiddleware, MuaGiaiController.getMuaGiaiByMa);
router.get('/id/:id', authMiddleware, MuaGiaiController.getMuaGiaiById);
router.put(
  '/ma/:maMuaGiai',
  authMiddleware,
  roleMiddleware('admin'),
  MuaGiaiController.updateMuaGiaiByMa
);
router.put('/id/:id', authMiddleware, roleMiddleware('admin'), MuaGiaiController.updateMuaGiaiById);
router.delete(
  '/ma/:maMuaGiai',
  authMiddleware,
  roleMiddleware('admin'),
  MuaGiaiController.deleteMuaGiaiByMa
);
router.delete(
  '/id/:id',
  authMiddleware,
  roleMiddleware('admin'),
  MuaGiaiController.deleteMuaGiaiById
);
router.get(
  '/ma/:maMuaGiai/trandau',
  authMiddleware,
  roleMiddleware('admin'),
  MuaGiaiController.getTranDauByMaMuaGiai
);
module.exports = router;
