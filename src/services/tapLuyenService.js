const LichTapLuyen = require('../models/TapLuyen.model');
const MuaGiai = require('../models/MuaGiai.model');
const TranDau = require('../models/TranDau.model');

const createLichTapLuyen = async (data) => {
  const { maMuaGiai, maTranDau } = data;
  await Promise.all([
    MuaGiai.findOne({ maMuaGiai }),
    TranDau.findOne({ maTranDau })
  ]).then(([muaGiai, tranDau]) => {
    if (!muaGiai) throw new Error('Mùa giải không tồn tại');
    if (!tranDau) throw new Error('Trận đấu không tồn tại');
  });
  const lich = new LichTapLuyen(data);
  return await lich.save();
};

const getAllLichTapLuyen = async () => {
  return await LichTapLuyen.find();
};

const getLichTapLuyenByMa = async (maLichTapLuyen) => {
  return await LichTapLuyen.findOne({ maLichTapLuyen });
};

const updateLichTapLuyen = async (maLichTapLuyen, data) => {
  return await LichTapLuyen.findOneAndUpdate({ maLichTapLuyen }, data, { new: true });
};

const deleteLichTapLuyen = async (maLichTapLuyen) => {
  return await LichTapLuyen.findOneAndDelete({ maLichTapLuyen });
};

module.exports = {
  createLichTapLuyen,
  getAllLichTapLuyen,
  getLichTapLuyenByMa,
  updateLichTapLuyen,
  deleteLichTapLuyen,
};