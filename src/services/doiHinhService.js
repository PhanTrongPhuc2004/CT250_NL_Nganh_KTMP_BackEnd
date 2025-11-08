const DoiHinh = require('../models/DoiHinh.model');
const CauThu = require('../models/cauthu');

const createDoiHinh = async (newDoiHinh) => {
  console.log('tao doi hinh', newDoiHinh);
  try {
    const doiHinh = new DoiHinh(newDoiHinh);
    await doiHinh.save();
    return doiHinh;
  } catch (err) {
    console.error('Error creating DoiHinh:', err);
    throw new Error('Không thể tạo Đội hình: ' + err.message);
  }
};

const updateDoiHinh = async (id, updatedDoiHinh) => {
  try {
    const doiHinh = await DoiHinh.findByIdAndUpdate(id, updatedDoiHinh, { new: true });
    if (!doiHinh) {
      throw new Error('Không tìm thấy Đội hình!');
    }
    return doiHinh;
  } catch (err) {
    console.error('Error updating DoiHinh:', err);
    throw new Error('Không thể cập nhật Đội hình: ' + err.message);
  }
};

const deleteDoiHinh = async (id) => {
  try {
    const doiHinh = await DoiHinh.findByIdAndDelete(id);
    if (!doiHinh) {
      throw new Error('Không tìm thấy Đội hình!');
    }
    return { message: 'Xóa Đội hình thành công!' };
  } catch (err) {
    console.error('Error deleting DoiHinh:', err);
    throw new Error('Không thể xóa Đội hình: ' + err.message);
  }
};

const getDetailDoiHinh = async (id) => {
  try {
    // Tìm đội hình theo ID
    const doiHinh = await DoiHinh.findById(id);
    if (!doiHinh) {
      throw new Error('Không tìm thấy Đội hình!');
    }
    console.log(doiHinh);
    return doiHinh;
  } catch (err) {
    console.error('Error getting detail DoiHinh:', err);
    throw new Error('Không thể lấy chi tiết Đội hình: ' + err.message);
  }
};
const getAllDoiHinh = async () => {
  try {
    const doiHinhs = await DoiHinh.find();
    return doiHinhs;
  } catch (err) {
    console.error('Error getting all DoiHinhs:', err);
    throw new Error('Không thể lấy danh sách Đội hình: ' + err.message);
  }
};

const getDoiHinhByMaDoiBong = async (maDoiBong) => {
  return await DoiHinh.find({ maDoiBong });
};
module.exports = {
  createDoiHinh,
  updateDoiHinh,
  deleteDoiHinh,
  getDetailDoiHinh,
  getAllDoiHinh,
  getDoiHinhByMaDoiBong,
};
