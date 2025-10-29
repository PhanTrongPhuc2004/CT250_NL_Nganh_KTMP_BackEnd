const VeController = require('../controller/VeController');
const authMiddleware = require('../middlewares/authMiddleware');  // Sử dụng middleware hiện có

const veRouter = require('express').Router();

veRouter.post('/mua', authMiddleware, VeController.muaVe);  // Mua vé, yêu cầu đăng nhập
veRouter.get('/', authMiddleware, VeController.getAllVe);  // Chỉ admin, có thể thêm check vaiTro trong controller nếu cần
veRouter.get('/user', authMiddleware, VeController.getVeByUser);  // Vé của user
veRouter.get('/:id', authMiddleware, VeController.getVeById);
veRouter.put('/:id', authMiddleware, VeController.updateVe);
veRouter.delete('/:id', authMiddleware, VeController.deleteVe);

module.exports = veRouter;