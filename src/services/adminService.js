const Admin = require('../models/Admin.model'); // Import trực tiếp model Admin

const createAdmin = async (adminData) => {
  return await Admin.create(adminData);
};

const getAllAdmins = async () => {
  return await Admin.findAll();
};

const getAdminById = async (id) => {
  return await Admin.findByPk(id);
};

const updateAdmin = async (id, updateData) => {
  const admin = await Admin.findByPk(id);
  if (!admin) return null;
  await admin.update(updateData);
  return admin;
};

const deleteAdmin = async (id) => {
  const admin = await Admin.findByPk(id);
  if (!admin) return null;
  await admin.destroy();
  return true;
};

module.exports = {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
};
