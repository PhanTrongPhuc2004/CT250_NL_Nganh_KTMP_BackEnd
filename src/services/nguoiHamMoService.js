const NguoiHamMo = require('../models/NguoiHamMo.model');

async function createNguoiHamMo(data) {
  return await NguoiHamMo.create(data);
}

async function getAllNguoiHamMo() {
  return await NguoiHamMo.findAll();
}

async function getNguoiHamMoById(id) {
  return await NguoiHamMo.findById(id);
}

async function updateNguoiHamMo(id, data) {
  const nguoiHamMo = await NguoiHamMo.findByIdAndUpdate(id, data, { new: true });
  if (!nguoiHamMo) return null;
  return nguoiHamMo;
}

async function deleteNguoiHamMo(id) {
  const nguoiHamMo = await NguoiHamMo.findById(id);
  if (!nguoiHamMo) return null;
  await nguoiHamMo.destroy();
  return true;
}

module.exports = {
  createNguoiHamMo,
  getAllNguoiHamMo,
  getNguoiHamMoById,
  updateNguoiHamMo,
  deleteNguoiHamMo,
};
