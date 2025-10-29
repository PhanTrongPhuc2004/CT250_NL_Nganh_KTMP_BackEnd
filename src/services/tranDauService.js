const TranDau = require('../models/TranDau.model');
const MuaGiai = require('../models/MuaGiai.model');

const createTranDau = async (data) => {
  const { maMuaGiai } = data;
  const muaGiai = await MuaGiai.findOne({ maMuaGiai });
  if (!muaGiai) throw new Error('Mùa giải không tồn tại');
  const tranDau = new TranDau(data);
  return await tranDau.save();
};

const getAllTranDau = async () => {
  return await TranDau.find();
};

const getTranDauByMa = async (maTranDau) => {
  return await TranDau.findOne({ maTranDau });
};

const updateTranDau = async (maTranDau, data) => {
  return await TranDau.findOneAndUpdate({ maTranDau }, data, { new: true });
};

const deleteTranDau = async (maTranDau) => {
  return await TranDau.findOneAndDelete({ maTranDau });
};

module.exports = {
  createTranDau,
  getAllTranDau,
  getTranDauByMa,
  updateTranDau,
  deleteTranDau,
};