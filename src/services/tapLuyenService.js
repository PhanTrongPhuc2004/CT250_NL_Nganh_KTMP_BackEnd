// src/services/tapLuyenService.js
const LichTapLuyen = require('../models/TapLuyen.model');
const DoiHinh = require('../models/DoiHinh.model');

class LichTapService {
  async createLichTap(data) {
    return await LichTapLuyen.create(data);
  }

  async getLichTapByDoiHinh(maDoiHinh) {
    // Bước 1: Lấy tất cả lịch tập theo maDoiHinh (là String)
    const lichList = await LichTapLuyen.find({ maDoiHinh })
      .sort({ ngayBatDau: 1 })
      .lean();

    // Bước 2: Manual populate tên đội hình (vì maDoiHinh là String)
    const doiHinh = await DoiHinh.findOne({ maDoiHinh }); // tìm theo trường maDoiHinh

    // Gắn tên đội hình vào từng lịch tập
    return lichList.map(lich => ({
      ...lich,
      maDoiHinh: {
        _id: doiHinh?._id,
        maDoiHinh: doiHinh?.maDoiHinh,
        tenDoiHinh: doiHinh?.tenDoiHinh || "Đội không xác định"
      }
    }));
  }

  // Nếu muốn dùng cho getAllLichTap cũng thêm manual populate
  async getAllLichTap() {
    const lichList = await LichTapLuyen.find().sort({ ngayBatDau: 1 }).lean();
    const maDoiHinhList = [...new Set(lichList.map(l => l.maDoiHinh))];
    const doiHinhs = await DoiHinh.find({ maDoiHinh: { $in: maDoiHinhList } });

    const doiHinhMap = {};
    doiHinhs.forEach(d => {
      doiHinhMap[d.maDoiHinh] = d;
    });

    return lichList.map(lich => ({
      ...lich,
      maDoiHinh: doiHinhMap[lich.maDoiHinh] ? {
        _id: doiHinhMap[lich.maDoiHinh]._id,
        maDoiHinh: doiHinhMap[lich.maDoiHinh].maDoiHinh,
        tenDoiHinh: doiHinhMap[lich.maDoiHinh].tenDoiHinh
      } : null
    }));
  }

  async getLichTapByMa(maLichTapLuyen) {
    return await LichTapLuyen.findOne({ maLichTapLuyen });
  }

  async getLichTapById(id) {
    return await LichTapLuyen.findById(id);
  }

  async updateLichTapByMa(maLichTapLuyen, data) {
    return await LichTapLuyen.findOneAndUpdate({ maLichTapLuyen }, data, { new: true });
  }

  async updateLichTapById(id, data) {
    return await LichTapLuyen.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteLichTapByMa(maLichTapLuyen) {
    return await LichTapLuyen.findOneAndDelete({ maLichTapLuyen });
  }

  async deleteLichTapById(id) {
    return await LichTapLuyen.findByIdAndDelete(id);
  }
}

module.exports = new LichTapService();