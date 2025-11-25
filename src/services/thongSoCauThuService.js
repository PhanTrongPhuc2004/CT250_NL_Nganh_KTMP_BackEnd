const ThongSoCauThu = require('../models/ThongSoCauThu.model');

// Create new ThongSoCauThu
const createThongSoCauThu = async (data) => {
  try {
    const newThongSoCauThu = new ThongSoCauThu(data);
    await newThongSoCauThu.save();
    return newThongSoCauThu;
  } catch (error) {
    throw new Error('Error creating ThongSoCauThu: ' + error.message);
  }
};

// Get all ThongSoCauThu
const getAllThongSoCauThu = async () => {
  try {
    const thongSoCauThus = await ThongSoCauThu.find({});
    return thongSoCauThus;
  } catch (error) {
    throw new Error('Error getting all ThongSoCauThu: ' + error.message);
  }
};

// Get ThongSoCauThu by ID
const getThongSoCauThuById = async (id) => {
  try {
    const thongSoCauThu = await ThongSoCauThu.findById(id);
    if (!thongSoCauThu) {
      throw new Error('ThongSoCauThu not found');
    }
    return thongSoCauThu;
  } catch (error) {
    throw new Error('Error getting ThongSoCauThu by ID: ' + error.message);
  }
};

// Update ThongSoCauThu by ID
const updateThongSoCauThu = async (id, data) => {
  try {
    const updatedThongSoCauThu = await ThongSoCauThu.findByIdAndUpdate(
      id,
      data,
      { new: true, upsert: true } // ← thêm upsert
    );

    return updatedThongSoCauThu;

  } catch (error) {
    throw new Error('Error updating/creating ThongSoCauThu: ' + error.message);
  }
};


// Delete ThongSoCauThu by ID
const deleteThongSoCauThu = async (id) => {
  try {
    const deletedThongSoCauThu = await ThongSoCauThu.findByIdAndDelete(id);
    res.status(200).json({ message: 'ThongSoCauThu deleted successfully' });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createThongSoCauThu,
  getAllThongSoCauThu,
  getThongSoCauThuById,
  updateThongSoCauThu,
  deleteThongSoCauThu,
};
