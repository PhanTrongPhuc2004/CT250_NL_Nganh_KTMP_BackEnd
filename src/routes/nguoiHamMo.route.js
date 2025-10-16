const nguoiHamMoRouter = require('express').Router();
const NguoiHamMoController = require('../controller/NguoiHamMoController');
nguoiHamMoRouter.post('/register', NguoiHamMoController.register);
module.exports = nguoiHamMoRouter;
