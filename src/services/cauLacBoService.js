const CauLacBo = require('../models/CauLacBo.model');

// Lấy tất cả câu lạc bộ
async function getAll() {
  return await CauLacBo.find();
}

// Lấy thông tin một câu lạc bộ theo id
async function getById(id) {
  return await CauLacBo.findById(id);
}

// Tạo mới câu lạc bộ
async function createInfor(data) {
  const club = new CauLacBo(data);
  return await club.save();
}

// Cập nhật câu lạc bộ
async function updateInfor(id, data) {
  return await CauLacBo.findByIdAndUpdate(id, data, { new: true });
}

// Xóa câu lạc bộ
async function remove(id) {
  return await CauLacBo.findByIdAndDelete(id);
}

module.exports = {
  getAll,
  getById,
  createInfor,
  updateInfor,
  remove,
};
