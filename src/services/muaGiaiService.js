const MuaGiai = require('../models/MuaGiai.model');

// Tạo một mùa giải mới
const createMuaGiai = async (data) => {
  const muaGiai = new MuaGiai(data);
  return await muaGiai.save();
};

// Lấy tất cả các mùa giải
const getAllMuaGiais = async () => {
  // Sắp xếp để mùa giải mới nhất hiển thị đầu tiên
  return await MuaGiai.find().sort({ namBatDau: -1 });
};

// Lấy thông tin mùa giải theo ID
const getMuaGiaiById = async (id) => {
  return await MuaGiai.findById(id);
};

// Cập nhật thông tin mùa giải theo ID
const updateMuaGiai = async (id, data) => {
  return await MuaGiai.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

// Xóa mùa giải theo ID
const deleteMuaGiai = async (id) => {
  return await MuaGiai.findByIdAndDelete(id);
};

module.exports = {
  createMuaGiai,
  getAllMuaGiais,
  getMuaGiaiById,
  updateMuaGiai,
  deleteMuaGiai,
};
