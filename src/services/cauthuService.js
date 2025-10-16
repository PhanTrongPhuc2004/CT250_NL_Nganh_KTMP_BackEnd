// services/cauthuService.js
const Cauthu = require('../models/cauthu');

/**
 * Lấy danh sách tất cả cầu thủ
 */
async function getAllCauthus() {
  return await Cauthu.find().sort({ name: 1 }); // sắp xếp theo tên
}

/**
 * Lấy thông tin cầu thủ theo ID
 * @param {String} id - ID của cầu thủ
 */
async function getCauthuById(id) {
  return await Cauthu.findById(id);
}

/**
 * Tạo mới một cầu thủ
 * @param {Object} data - Dữ liệu cầu thủ
 */
async function createCauthu(data) {
  const newCauthu = new Cauthu(data);
  return await newCauthu.save();
}

/**
 * Cập nhật thông tin cầu thủ theo ID
 * @param {String} id - ID cầu thủ cần cập nhật
 * @param {Object} updateData - Dữ liệu cần cập nhật
 */
async function updateCauthu(id, updateData) {
  return await Cauthu.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
}

/**
 * Xóa cầu thủ theo ID
 * @param {String} id - ID cầu thủ cần xóa
 */
async function deleteCauthu(id) {
  return await Cauthu.findByIdAndDelete(id);
}

/**
 * Tìm kiếm cầu thủ theo tên hoặc vị trí
 * @param {String} keyword - Từ khóa tìm kiếm
 */
async function searchCauthus(keyword) {
  const regex = new RegExp(keyword, 'i'); // tìm kiếm không phân biệt hoa thường
  return await Cauthu.find({
    $or: [{ name: regex }, { position: regex }, { nationality: regex }],
  });
}

/**
 * Lọc cầu thủ theo vị trí thi đấu
 * @param {String} position - Vị trí (Thủ môn, Hậu vệ, Tiền vệ, Tiền đạo)
 */
async function filterByPosition(position) {
  return await Cauthu.find({ position });
}

/**
 * Lọc cầu thủ theo quốc tịch
 * @param {String} nationality - Quốc tịch
 */
async function filterByNationality(nationality) {
  return await Cauthu.find({ nationality });
}

module.exports = {
  getAllCauthus,
  getCauthuById,
  createCauthu,
  updateCauthu,
  deleteCauthu,
  searchCauthus,
  filterByPosition,
  filterByNationality,
};
