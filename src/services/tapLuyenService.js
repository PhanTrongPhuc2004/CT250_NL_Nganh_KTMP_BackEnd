const TapLuyen = require('../models/TapLuyen.model');

// Service để tạo mới một buổi tập luyện
const createTapLuyen = async (tapLuyenData) => {
  try {
    const newTapLuyen = new TapLuyen(tapLuyenData);
    await newTapLuyen.save();
    return newTapLuyen;
  } catch (error) {
    throw new Error('Error creating tap luyen: ' + error.message);
  }
};

// Service để lấy tất cả các buổi tập luyện
const getAllTapLuyen = async () => {
  try {
    const tapLuyenList = await TapLuyen.find();
    return tapLuyenList;
  } catch (error) {
    throw new Error('Error getting all tap luyen: ' + error.message);
  }
};

// Service để lấy một buổi tập luyện theo ID
const getTapLuyenById = async (tapLuyenId) => {
  try {
    const tapLuyen = await TapLuyen.findById(tapLuyenId);
    if (!tapLuyen) {
      throw new Error('Tap luyen not found');
    }
    return tapLuyen;
  } catch (error) {
    throw new Error('Error getting tap luyen by ID: ' + error.message);
  }
};

// Service để cập nhật một buổi tập luyện
const updateTapLuyen = async (tapLuyenId, updateData) => {
  try {
    const updatedTapLuyen = await TapLuyen.findByIdAndUpdate(tapLuyenId, updateData, { new: true });
    if (!updatedTapLuyen) {
      throw new Error('Tap luyen not found');
    }
    return updatedTapLuyen;
  } catch (error) {
    throw new Error('Error updating tap luyen: ' + error.message);
  }
};

// Service để xóa một buổi tập luyện
const deleteTapLuyen = async (tapLuyenId) => {
  try {
    const deletedTapLuyen = await TapLuyen.findByIdAndDelete(tapLuyenId);
    if (!deletedTapLuyen) {
      throw new Error('Tap luyen not found');
    }
    return deletedTapLuyen;
  } catch (error) {
    throw new Error('Error deleting tap luyen: ' + error.message);
  }
};
//get lich tap theo id tran dau
const getLichTapByTranDauId = async (tranDauId) => {
  try {
    const lichTap = await TapLuyen.find({ tranDauId: tranDauId });
    return lichTap;
  } catch (error) {
    throw new Error('Error getting lich tap by tran dau ID: ' + error.message);
  }
};
module.exports = {
  createTapLuyen,
  getAllTapLuyen,
  getTapLuyenById,
  updateTapLuyen,
  deleteTapLuyen,
  getLichTapByTranDauId,
};
//
