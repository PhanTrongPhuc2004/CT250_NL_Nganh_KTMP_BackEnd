const LichTrinh = require("../models/lichtrinh");

/**
 * Tạo lịch trình mới
 */
async function createLichTrinh(data) {
  const lichtrinh = new LichTrinh(data);
  return await lichtrinh.save();
}

/**
 * Lấy danh sách tất cả lịch trình
 */
async function getAllLichTrinh() {
  return await LichTrinh.find().sort({ createdAt: -1 });
}

/**
 * Lấy chi tiết lịch trình theo ID
 */
async function getLichTrinhById(id) {
  return await LichTrinh.findById(id);
}

/**
 * Cập nhật lịch trình theo ID
 */
async function updateLichTrinh(id, data) {
  return await LichTrinh.findByIdAndUpdate(id, data, { new: true });
}

/**
 * Xóa lịch trình theo ID
 */
async function deleteLichTrinh(id) {
  return await LichTrinh.findByIdAndDelete(id);
}

module.exports = {
  createLichTrinh,
  getAllLichTrinh,
  getLichTrinhById,
  updateLichTrinh,
  deleteLichTrinh,
};
