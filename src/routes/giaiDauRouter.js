const router = require('express').Router();
const giaiDauService = require('../services/giaiDauService');
const GiaiDauController = require('../controller/GiaiDauController');

router.get('/', GiaiDauController.getAllGiaiDaus);
router.post('/', GiaiDauController.createGiaiDau);
router.get('/:id', GiaiDauController.getGiaiDauById);
router.put('/:id', GiaiDauController.updateGiaiDau);
router.delete('/:id', GiaiDauController.deleteGiaiDau);
router.get('/:id/trandau', GiaiDauController.getMatchesByGiaiDauId);
module.exports = router;
