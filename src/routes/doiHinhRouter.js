const router = require('express').Router();
const DoiHinhController = require('../controller/DoiHinhController');

router.post('/', DoiHinhController.createDoiHinh);
router.get('/', DoiHinhController.getAllDoiHinh);
router.get('/:id', DoiHinhController.getDetailDoiHinh);
router.put('/:id', DoiHinhController.updateDoiHinh);
router.delete('/:id', DoiHinhController.deleteDoiHinh);
router.get('/doibong/ma/:maDoiBong', DoiHinhController.getDoiHinhByMaDoiBong);

module.exports = router;
