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
const updateKetQuaTranDauByMaTranDau = async (maTranDau, updateData) => {
  console.log('🔧 ===== [Service] BẮT ĐẦU updateKetQuaTranDauByMaTranDau =====');
  console.log('🎯 MaTranDau nhận được:', maTranDau);
  console.log('📝 UpdateData nhận được:', JSON.stringify(updateData, null, 2));

  try {
    // Tạo filter object
    const filter = { maTranDau: maTranDau };
    console.log('🔍 Filter object:', filter);

    // Thực hiện update
    console.log('🔄 Đang thực hiện findOneAndUpdate...');
    const updatedKetQuaTranDau = await KetQuaTranDau.findOneAndUpdate(
      filter, // ✅ OBJECT filter
      updateData,
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    console.log('✅ [Service] Kết quả findOneAndUpdate:', updatedKetQuaTranDau);

    if (!updatedKetQuaTranDau) {
      console.error('❌ [Service] Không tìm thấy KetQuaTranDau');
      throw new Error('KetQuaTranDau not found');
    }

    console.log('🎉 [Service] Cập nhật thành công');
    return updatedKetQuaTranDau;
  } catch (error) {
    console.error('💥 [Service] Lỗi:', error);
    console.error('📋 [Service] Error stack:', error.stack);
    throw new Error('Error updating KetQuaTranDau: ' + error.message);
  } finally {
    console.log('🏁 ===== [Service] KẾT THÚC updateKetQuaTranDauByMaTranDau =====\n');
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
  updateKetQuaTranDauByMaTranDau,
  deleteKetQuaTranDau,
};
