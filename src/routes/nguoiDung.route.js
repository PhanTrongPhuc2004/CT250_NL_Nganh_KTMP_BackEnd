const NguoiDungController = require('../controller/NguoiDung.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const nguoiDungRouter = require('express').Router();
nguoiDungRouter.post('/login', NguoiDungController.login);
nguoiDungRouter.post('/logout', NguoiDungController.logout);
nguoiDungRouter.get('/check', authMiddleware, NguoiDungController.check);
module.exports = nguoiDungRouter;
