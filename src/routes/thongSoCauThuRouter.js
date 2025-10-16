const router = require('express').Router();
const ThongSoCauThuController = require('../controller/ThongSoCauThuController');

router.get('/', ThongSoCauThuController.getAllThongSoCauThu);
router.get('/:id', ThongSoCauThuController.getThongSoCauThuById);
router.post('/', ThongSoCauThuController.createThongSoCauThu);
router.put('/:id', ThongSoCauThuController.updateThongSoCauThu);
router.delete('/:id', ThongSoCauThuController.deleteThongSoCauThu);

module.exports = router;
