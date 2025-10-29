const GiaiDau = require('../models/GiaiDau.model');
const TranDau = require('../models/TranDau.model');
// 🟢 Tạo một giải đấu mới
const createGiaiDau = async (data) => {
  const giaiDau = new GiaiDau(data);
  return await giaiDau.save();
};

// 🟢 Lấy tất cả các giải đấu (populate đúng trường muaGiaiId)
const getAllGiaiDaus = async () => {
  return await GiaiDau.find()
    .populate('muaGiaiId') // ✅ đúng với schema
    .sort({ tenGiaiDau: 1 });
};

// 🟢 Lấy thông tin giải đấu theo ID
const getGiaiDauById = async (id) => {
  return await GiaiDau.findById(id).populate('muaGiaiId');
};

// 🟢 Cập nhật thông tin giải đấu
const updateGiaiDau = async (id, data) => {
  return await GiaiDau.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

// 🟢 Xóa giải đấu theo ID
const deleteGiaiDau = async (id) => {
  return await GiaiDau.findByIdAndDelete(id);
};

const getMatchesByGiaiDauId = async (giaiDauId) => {
  const trandau = await TranDau.find({ giaiDauId });
  console.log('giai dau id', giaiDauId);
  console.log('trandau service', trandau);
  return trandau;
};

const getGiaiDausByMuaGiaiId = async (muaGiaiId) => {
  return await GiaiDau.find({ muaGiaiId }).sort({ tenGiaiDau: 1 });
};

module.exports = {
  createGiaiDau,
  getAllGiaiDaus,
  getGiaiDauById,
  updateGiaiDau,
  deleteGiaiDau,
  getMatchesByGiaiDauId,
  getGiaiDausByMuaGiaiId,
};
