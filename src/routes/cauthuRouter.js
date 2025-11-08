const express = require('express');
const router = express.Router();
const cauthuController = require('../controller/cauthuController');
// CRUD cơ bản
router.get('/', cauthuController.getAllCauthus);
router.get('/:id', cauthuController.getCauthuById);
router.post('/', cauthuController.createCauthu);
router.put('/:id', cauthuController.updateCauthu);
router.delete('/:id', cauthuController.deleteCauthu);
router.patch('/:id', cauthuController.updateDoiHinh);
router.delete('/:cauthuId/doiHinh/:doiHinhId', cauthuController.deleteDoiHinh);
// Tìm kiếm và lọc
router.get('/search/query', cauthuController.searchCauthus);
router.get('/filter/position/:position', cauthuController.filterByPosition);
router.get('/filter/nationality/:nationality', cauthuController.filterByNationality);
module.exports = router;
