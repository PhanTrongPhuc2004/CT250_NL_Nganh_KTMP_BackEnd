const KetQuaTranDau = require('../models/KetQuaTranDau.model');
const CauThu = require('../models/cauthu');
const TranDau = require('../models/TranDau.model');
const ketQuaTranDauService = require('../services/ketQuaTranDauService');
class KetQuaTranDauController {
  async createKetQuaTranDau(req, res) {
    try {
      const ketQuaTranDau = await KetQuaTranDau.create(req.body);
      res.status(201).json(ketQuaTranDau);
    } catch (error) {
      console.log(error);
    }
  }
  async getAllKetQuaTranDau(req, res) {
    try {
      const ketQuaTranDau = await KetQuaTranDau.find();
      res.status(200).json(ketQuaTranDau);
    } catch (error) {
      console.log(error);
    }
  }

  async getKetQuaTranDauByMa(req, res) {
    // console.log('🚀 ===== BẮT ĐẦU getKetQuaTranDauById =====');

    try {
      const ketQuaTranDau = await KetQuaTranDau.findOne({ maTranDau: req.params.maTranDau });
      if (!ketQuaTranDau) {
        return res.status(404).json({ message: 'KetQuaTranDau not found' });
      }
      res.status(200).json(ketQuaTranDau);
    } catch (error) {
      console.log(error);
    }
  }

  async updateKetQuaTranDau(req, res) {
    console.log('🚀 ===== BẮT ĐẦU updateKetQuaTranDau =====');
    console.log('📥 Request body:', req.body);

    try {
      const maTranDau = req.body.maTranDau;
      console.log('🎯 Mã trận đấu:', maTranDau);

      // Tìm trận đấu
      console.log('🔎 Đang tìm trận đấu...');
      const tranDau = await TranDau.findOne({ maTranDau });

      if (!tranDau) {
        console.error('❌ Không tìm thấy trận đấu');
        return res.status(404).json({ message: 'TranDau not found' });
      }

      console.log('✅ Tìm thấy trận đấu - Trạng thái HIỆN TẠI:', tranDau.trangThai);

      // Cập nhật trạng thái
      console.log('🔄 Đang cập nhật trạng thái thành "ket_thuc"...');
      tranDau.trangThai = 'ket_thuc';

      // LƯU và KIỂM TRA kết quả
      const savedTranDau = await tranDau.save();
      console.log('✅ Đã lưu trận đấu - Trạng thái SAU KHI LƯU:', savedTranDau.trangThai);

      // Gọi service
      console.log('📞 Đang gọi service...');
      const ketQuaTranDau = await ketQuaTranDauService.updateKetQuaTranDauByMaTranDau(
        maTranDau,
        req.body
      );

      if (!ketQuaTranDau) {
        console.error('❌ Service trả về null');
        return res.status(404).json({ message: 'KetQuaTranDau not found' });
      }

      console.log('🎉 Cập nhật thành công - Kết quả:', ketQuaTranDau);
      res.status(200).json(ketQuaTranDau);
    } catch (error) {
      console.error('💥 Lỗi trong controller:', error);
      console.error('📋 Stack:', error.stack);
      res.status(500).json({ message: error.message });
    } finally {
      console.log('🏁 ===== KẾT THÚC updateKetQuaTranDau =====\n');
    }
  }
  async deleteKetQuaTranDau(req, res) {
    try {
      const ketQuaTranDau = await KetQuaTranDau.findByIdAndDelete(req.params.id);
      if (!ketQuaTranDau) {
        return res.status(404).json({ message: 'KetQuaTranDau not found' });
      }
      res.status(200).json({ message: 'KetQuaTranDau deleted' });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new KetQuaTranDauController();
