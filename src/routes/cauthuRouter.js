/*const express = require('express');
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
router.get('/doibong/ma/:maDoiBong', cauthuController.getCauThuByMaDoiBong)
router.get('/trandau/id/:tranDauId', cauthuController.getCauThuByTranDauId)
// Tìm kiếm và lọc
router.get('/search/query', cauthuController.searchCauthus);
router.get('/filter/position/:position', cauthuController.filterByPosition);
router.get('/filter/nationality/:nationality', cauthuController.filterByNationality);
module.exports = router;
*/

const express = require('express');
const router = express.Router();
const cauthuController = require('../controller/cauthuController');

// Route đặc biệt / cụ thể PHẢI đặt trước
router.get('/doibong/ma/:maDoiBong', cauthuController.getCauThuByMaDoiBong);
router.get('/trandau/id/:tranDauId', cauthuController.getCauThuByTranDauId);

// Tìm kiếm và lọc
router.get('/search/query', cauthuController.searchCauthus);
router.get('/filter/position/:position', cauthuController.filterByPosition);
router.get('/filter/nationality/:nationality', cauthuController.filterByNationality);

// CRUD cơ bản
router.get('/', cauthuController.getAllCauthus);
router.post('/', cauthuController.createCauthu);
router.patch('/:id', cauthuController.updateDoiHinh);
router.delete('/:cauthuId/doiHinh/:doiHinhId', cauthuController.deleteDoiHinh);

// Các route phụ thuộc ID đặt CUỐI CÙNG
router.get('/:id', cauthuController.getCauthuById);
router.put('/:id', cauthuController.updateCauthu);
router.delete('/:id', cauthuController.deleteCauthu);

module.exports = router;
