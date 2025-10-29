const nguoiDungRouter = require('./nguoiDung.route');
const nguoiHamMoRouter = require('./nguoiHamMo.route');
const cauthuRouter = require('./cauthuRouter');
const hopdongRouter = require('./hopdongRouter');
const lichtrinhRouter = require('./lichtrinhRouter');
const qualuuniemRouter = require('./qualuuniemRouter');
const CauLacBoController = require('./cauLacBoRouter');
const tranDauRouter = require('./tranDauRouter');
const tapLuyenRouter = require('./tapLuyenRouter');
const doiHinhRouter = require('./doiHinhRouter');
const ketQuaTranDauRouter = require('./ketQuaTranDauRouter');
const thongSoCauThuRouter = require('./thongSoCauThuRouter');
const muaGiaiRouter = require('./muaGiaiRouter');
const giaiDauRouter = require('./giaiDauRouter');
function route(app) {
  app.use('/nguoihammo', nguoiHamMoRouter);
  app.use('/nguoidung', nguoiDungRouter);
  app.use('/cauthu', cauthuRouter);
  app.use('/hopdong', hopdongRouter);
  app.use('/lichtrinh', lichtrinhRouter);
  app.use('/qualuuniem', qualuuniemRouter);
  app.use('/caulacbo', CauLacBoController);
  app.use('/trandau', tranDauRouter);
  app.use('/tapluyen', tapLuyenRouter);
  app.use('/doihinh', doiHinhRouter);
  app.use('/ketquatrandau', ketQuaTranDauRouter);
  app.use('/thongsocauthu', thongSoCauThuRouter);
  app.use('/muagiai', muaGiaiRouter);
  app.use('/giaidau', giaiDauRouter);
}

module.exports = route;
