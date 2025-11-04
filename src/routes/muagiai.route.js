// src/routes/muagiai.route.js
const express = require('express');
const router = express.Router();
const MuaGiaiController = require('../controller/MuaGiaiController');
const authMiddleware = require('../middlewares/authMiddleware');

// [POST] /muagiai - Tạo mùa giải
router.post('/', authMiddleware, MuaGiaiController.createMuaGiai);

// [GET] /muagiai - Lấy tất cả mùa giải
router.get('/', MuaGiaiController.getAllMuaGiai);

// [GET] /muagiai/ma/:maMuaGiai - Lấy theo mã
router.get('/ma/:maMuaGiai', MuaGiaiController.getMuaGiaiByMa);

// [GET] /muagiai/id/:id - Lấy theo _id
router.get('/id/:id', MuaGiaiController.getMuaGiaiById);

// [PUT] /muagiai/ma/:maMuaGiai - Cập nhật theo mã
router.put('/ma/:maMuaGiai', authMiddleware, MuaGiaiController.updateMuaGiaiByMa);

// [PUT] /muagiai/id/:id - Cập nhật theo _id
router.put('/id/:id', authMiddleware, MuaGiaiController.updateMuaGiaiById);

// [DELETE] /muagiai/ma/:maMuaGiai - Xóa theo mã
router.delete('/ma/:maMuaGiai', authMiddleware, MuaGiaiController.deleteMuaGiaiByMa);

// [DELETE] /muagiai/id/:id - Xóa theo _id
router.delete('/id/:id', authMiddleware, MuaGiaiController.deleteMuaGiaiById);

module.exports = router;