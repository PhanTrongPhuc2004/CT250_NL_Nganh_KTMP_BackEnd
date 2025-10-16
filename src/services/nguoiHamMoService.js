const NguoiHamMo = require('../models/NguoiHamMo.model');

async function createNguoiHamMo(data) {
  return await NguoiHamMo.create(data);
}

async function getAllNguoiHamMo() {
  return await NguoiHamMo.findAll();
}

async function getNguoiHamMoById(id) {
  return await NguoiHamMo.findByPk(id);
}

async function updateNguoiHamMo(id, data) {
  const nguoiHamMo = await NguoiHamMo.findByPk(id);
  if (!nguoiHamMo) return null;
  await nguoiHamMo.update(data);
  return nguoiHamMo;
}

async function deleteNguoiHamMo(id) {
  const nguoiHamMo = await NguoiHamMo.findByPk(id);
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
