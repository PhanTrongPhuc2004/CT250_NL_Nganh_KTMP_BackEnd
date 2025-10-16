const router = require('express').Router();
const KetQuaTranDauController = require('../controller/KetQuaTranDauController');
router.get('/', KetQuaTranDauController.getAllKetQuaTranDau);
router.get('/:id', KetQuaTranDauController.getKetQuaTranDauById);
router.post('/', KetQuaTranDauController.createKetQuaTranDau);
router.put('/:id', KetQuaTranDauController.updateKetQuaTranDau);
router.delete('/:id', KetQuaTranDauController.deleteKetQuaTranDau);

module.exports = router;
