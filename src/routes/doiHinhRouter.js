const router = require('express').Router();
const DoiHinhController = require('../controller/DoiHinhController');

router.post('/', DoiHinhController.createDoiHinh);
router.get('/', DoiHinhController.getAllDoiHinh);
router.get('/:id', DoiHinhController.getDetailDoiHinh);
router.put('/:id', DoiHinhController.updateDoiHinh);
router.delete('/:id', DoiHinhController.deleteDoiHinh);

module.exports = router;
