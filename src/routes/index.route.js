const nguoiDungRouter = require('./nguoiDung.route');
const nguoiHamMoRouter = require('./nguoiHamMo.route');

function route(app) {
  app.use('/nguoihammo', nguoiHamMoRouter);
  app.use('/nguoidung', nguoiDungRouter);
}

module.exports = route;
