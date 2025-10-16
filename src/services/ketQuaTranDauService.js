const KetQuaTranDau = require('../models/KetQuaTranDau.model');

// Create a new KetQuaTranDau
const createKetQuaTranDau = async (ketQuaTranDauData) => {
  try {
    const newKetQuaTranDau = new KetQuaTranDau(ketQuaTranDauData);
    await newKetQuaTranDau.save();
    return newKetQuaTranDau;
  } catch (error) {
    throw new Error('Error creating KetQuaTranDau: ' + error.message);
  }
};

// Get all KetQuaTranDau records
const getAllKetQuaTranDau = async () => {
  try {
    const ketQuaTranDauRecords = await KetQuaTranDau.find();
    return ketQuaTranDauRecords;
  } catch (error) {
    throw new Error('Error fetching all KetQuaTranDau: ' + error.message);
  }
};

// Get a KetQuaTranDau by ID
const getKetQuaTranDauById = async (id) => {
  try {
    const ketQuaTranDau = await KetQuaTranDau.findById(id);
    if (!ketQuaTranDau) {
      throw new Error('KetQuaTranDau not found');
    }
    return ketQuaTranDau;
  } catch (error) {
    throw new Error('Error fetching KetQuaTranDau by ID: ' + error.message);
  }
};

// Update a KetQuaTranDau by ID
const updateKetQuaTranDau = async (id, updateData) => {
  try {
    const updatedKetQuaTranDau = await KetQuaTranDau.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedKetQuaTranDau) {
      throw new Error('KetQuaTranDau not found');
    }
    return updatedKetQuaTranDau;
  } catch (error) {
    throw new Error('Error updating KetQuaTranDau: ' + error.message);
  }
};

// Delete a KetQuaTranDau by ID
const deleteKetQuaTranDau = async (id) => {
  try {
    const ketQuaTranDauDeleted = await KetQuaTranDau.findByIdAndDelete(id);
    if (!ketQuaTranDauDeleted) {
      throw new Error('KetQuaTranDau not found');
    }
    return ketQuaTranDauDeleted;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllKetQuaTranDau,
  createKetQuaTranDau,
  getKetQuaTranDauById,
  updateKetQuaTranDau,
  deleteKetQuaTranDau,
};
