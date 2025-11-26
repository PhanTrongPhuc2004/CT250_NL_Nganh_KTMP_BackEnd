const HuanLuyenVien = require('../models/HuanLuyenVien.model');

// Lấy tất cả huấn luyện viên
const getAll = async () => {
  return await HuanLuyenVien.findAll();
};

// Lấy huấn luyện viên theo ID
const getById = async (id) => {
  return await HuanLuyenVien.findById(id);
};

// Tạo mới huấn luyện viên
const createHuanLuyenVien = async (data) => {
  return await HuanLuyenVien.create(data);
};

// Cập nhật huấn luyện viên
const updateHuanLuyenVien = async (id, data) => {
  const hlv = await HuanLuyenVien.findById(id);
  if (!hlv) return null;

  // cập nhật field
  hlv.set(data);

  // lưu lại
  await hlv.save();

  return hlv;
};


// Xóa huấn luyện viên
const remove = async (id) => {
  const hlv = await HuanLuyenVien.findById(id);
  if (!hlv) return null;
  await hlv.destroy();
  return true;
};

module.exports = {
  getAll,
  getById,
  createHuanLuyenVien,
  updateHuanLuyenVien,
  remove,
};
