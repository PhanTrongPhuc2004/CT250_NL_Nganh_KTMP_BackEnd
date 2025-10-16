const express = require('express');
const router = express.Router();
const CauLacBoController = require('../controller/CauLacBoController');
// CRUD cơ bản
router.get('/', CauLacBoController.getAllInfor);
router.get('/:id', CauLacBoController.getById);
router.post('/', CauLacBoController.createCauLacBoInfor);
router.put('/:id', CauLacBoController.updateCauLacBoInfor);
router.delete('/:id', CauLacBoController.deleteCauLacBoInfor);

module.exports = router;
