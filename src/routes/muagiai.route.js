const express = require('express');
const router = express.Router();
const MuaGiaiController = require('../controller/MuaGiaiController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, MuaGiaiController.createMuaGiai);
router.get('/', MuaGiaiController.getAllMuaGiai);
router.get('/:ma', MuaGiaiController.getMuaGiaiByMa);
router.put('/:ma', authMiddleware, MuaGiaiController.updateMuaGiai);
router.delete('/:ma', authMiddleware, MuaGiaiController.deleteMuaGiai);

module.exports = router;