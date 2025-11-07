const express = require('express');
const router = express.Router();
const TintucController = require('../controller/Tintuc.controller');

router.get('/', TintucController.getAllTintuc);
router.get('/:id', TintucController.getTintucById);
router.post('/', TintucController.createTintuc);
router.put('/:id', TintucController.updateTintuc);
router.delete('/:id', TintucController.deleteTintuc);

module.exports = router;
