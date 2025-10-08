const nguoiDungRouter = require('./nguoiDung.route');
const nguoiHamMoRouter = require('./nguoiHamMo.route');
const cauthuRouter = require("./cauthuRouter");
const hopdongRouter = require("./hopdongRouter");
const lichtrinhRouter = require("./lichtrinhRouter");
const qualuuniemRouter = require("./qualuuniemRouter");

function route(app) {
  app.use('/nguoihammo', nguoiHamMoRouter);
  app.use('/nguoidung', nguoiDungRouter);
  app.use("/cauthu", cauthuRouter);
  app.use("/hopdong", hopdongRouter);
  app.use("/lichtrinh", lichtrinhRouter);
  app.use("/qualuuniem", qualuuniemRouter);
}

module.exports = route;
