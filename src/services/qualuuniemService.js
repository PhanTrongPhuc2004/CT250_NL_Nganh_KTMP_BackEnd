const QuaLuuNiem = require("../models/qualuuniem");

/**
 * Tạo quà lưu niệm mới
 */
async function createQuaLuuNiem(data) {
  const item = new QuaLuuNiem(data);
  return await item.save();
}

/**
 * Lấy danh sách tất cả quà lưu niệm
 */
async function getAllQuaLuuNiem() {
  return await QuaLuuNiem.find().sort({ createdAt: -1 });
}

/**
 * Lấy thông tin quà lưu niệm theo ID
 */
async function getQuaLuuNiemById(id) {
  return await QuaLuuNiem.findById(id);
}

/**
 * Cập nhật thông tin quà lưu niệm theo ID
 */
async function updateQuaLuuNiem(id, data) {
  return await QuaLuuNiem.findByIdAndUpdate(id, data, { new: true });
}

/**
 * Xóa quà lưu niệm theo ID
 */
async function deleteQuaLuuNiem(id) {
  return await QuaLuuNiem.findByIdAndDelete(id);
}

module.exports = {
  createQuaLuuNiem,
  getAllQuaLuuNiem,
  getQuaLuuNiemById,
  updateQuaLuuNiem,
  deleteQuaLuuNiem,
};
