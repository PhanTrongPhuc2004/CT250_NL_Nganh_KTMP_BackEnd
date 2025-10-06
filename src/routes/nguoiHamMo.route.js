const nguoiHamMoRouter = require('express').Router();
const NguoiHamMoController = require('../controller/NguoiHamMo.controller');
nguoiHamMoRouter.post('/register', NguoiHamMoController.register);
module.exports = nguoiHamMoRouter;
