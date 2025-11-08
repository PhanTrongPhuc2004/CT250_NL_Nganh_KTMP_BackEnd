// src/routes/index.route.js
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
const veRouter = require('./ve.route');
const DonHangRoute = require('./DonHang.route');
const giaiDauRouter = require('./giaidau.route');
const muaGiaiRouter = require('./muagiai.route');
const thongBaoRouter = require('./thongbao.route');
const GioHangRouter = require('./GioHangRouter');
const doiBong = require('./doibong.route');
const cauHinhVeRouter = require('./cauhinhve.route');
const Tintuc = require('./Tintuc.routes');

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
  app.use('/ve', veRouter);
  app.use('/donhang', DonHangRoute);
  app.use('/giaidau', giaiDauRouter);
  app.use('/muagiai', muaGiaiRouter);
  app.use('/thongbao', thongBaoRouter);
  app.use('/giohang', thongBaoRouter);
  app.use('/doibong', doiBong);
  app.use('/cauhinhve', cauHinhVeRouter);

  app.use('/tintuc', Tintuc);

  app.use('/doihinh', doiHinhRouter);
}

module.exports = route;
