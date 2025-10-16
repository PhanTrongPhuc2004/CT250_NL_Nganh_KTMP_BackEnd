import NguoiDung from '../models/nguoiDungModel';

// Create a new NguoiDung
export const createNguoiDung = async (nguoiDungData) => {
  try {
    const newNguoiDung = new NguoiDung(nguoiDungData);
    await newNguoiDung.save();
    return newNguoiDung;
  } catch (error) {
    throw new Error('Error creating NguoiDung: ' + error.message);
  }
};

// Get all NguoiDung
export const getAllNguoiDung = async () => {
  try {
    const nguoiDungList = await NguoiDung.find();
    return nguoiDungList;
  } catch (error) {
    throw new Error('Error fetching NguoiDung: ' + error.message);
  }
};

// Get NguoiDung by ID
export const getNguoiDungById = async (id) => {
  try {
    const nguoiDung = await NguoiDung.findById(id);
    if (!nguoiDung) {
      throw new Error('NguoiDung not found');
    }
    return nguoiDung;
  } catch (error) {
    throw new Error('Error fetching NguoiDung by ID: ' + error.message);
  }
};

// Update NguoiDung by ID
export const updateNguoiDung = async (id, nguoiDungData) => {
  try {
    const updatedNguoiDung = await NguoiDung.findByIdAndUpdate(id, nguoiDungData, { new: true });
    if (!updatedNguoiDung) {
      throw new Error('NguoiDung not found');
    }
    return updatedNguoiDung;
  } catch (error) {
    throw new Error('Error updating NguoiDung: ' + error.message);
  }
};

// Delete NguoiDung by ID
export const deleteNguoiDung = async (id) => {
  try {
    const deletedNguoiDung = await NguoiDung.findByIdAndDelete(id);
    if (!deletedNguoiDung) {
      throw new Error('NguoiDung not found');
    }
    return deletedNguoiDung;
  } catch (error) {
    console.log(error);
  }
};
