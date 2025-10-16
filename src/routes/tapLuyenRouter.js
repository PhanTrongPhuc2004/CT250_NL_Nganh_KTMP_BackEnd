const router = require('express').Router();
const TapLuyenController = require('../controller/TapLuyenController');

router.get('/', TapLuyenController.getAllTapLuyen);
router.get('/:id', TapLuyenController.getTapLuyenById);
router.post('/', TapLuyenController.createTapLuyen);
router.put('/:id', TapLuyenController.updateTapLuyen);
router.delete('/:id', TapLuyenController.deleteTapLuyen);

module.exports = router;
