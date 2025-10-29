const LichTrinh = require('../models/LichTrinh.model');
const MuaGiai = require('../models/MuaGiai.model');

const createLichTrinh = async (data) => {
  const { maMuaGiai } = data;
  const muaGiai = await MuaGiai.findOne({ maMuaGiai });
  if (!muaGiai) throw new Error('Mùa giải không tồn tại');
  const lich = new LichTrinh(data);
  return await lich.save();
};

const getAllLichTrinh = async () => {
  return await LichTrinh.find();
};

const getLichTrinhByMa = async (maLichTrinh) => {
  return await LichTrinh.findOne({ maLichTrinh });
};

const updateLichTrinh = async (maLichTrinh, data) => {
  return await LichTrinh.findOneAndUpdate({ maLichTrinh }, data, { new: true });
};

const deleteLichTrinh = async (maLichTrinh) => {
  return await LichTrinh.findOneAndDelete({ maLichTrinh });
};

module.exports = {
  createLichTrinh,
  getAllLichTrinh,
  getLichTrinhByMa,
  updateLichTrinh,
  deleteLichTrinh,
};