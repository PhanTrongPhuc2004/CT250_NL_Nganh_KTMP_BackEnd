const HopDong = require("../models/hopdong");

/**
 * Tạo hợp đồng mới
 */
async function createHopDong(data) {
  const hopdong = new HopDong(data);
  return await hopdong.save();
}

/**
 * Lấy danh sách tất cả hợp đồng
 */
async function getAllHopDong() {
  return await HopDong.find().sort({ createdAt: -1 });
}

/**
 * Lấy chi tiết hợp đồng theo ID
 */
async function getHopDongById(id) {
  return await HopDong.findById(id);
}

/**
 * Cập nhật hợp đồng theo ID
 */
async function updateHopDong(id, data) {
  return await HopDong.findByIdAndUpdate(id, data, { new: true });
}

/**
 * Xóa hợp đồng theo ID
 */
async function deleteHopDong(id) {
  return await HopDong.findByIdAndDelete(id);
}

module.exports = {
  createHopDong,
  getAllHopDong,
  getHopDongById,
  updateHopDong,
  deleteHopDong,
};
