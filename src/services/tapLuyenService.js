// src/services/tapLuyenService.js
const LichTapLuyen = require('../models/TapLuyen.model');

class LichTapService {
  async createLichTap(data) {
    return await LichTapLuyen.create(data);
  }

  async getAllLichTap() {
    return await LichTapLuyen.find()
      .populate('maDoiBong', 'tenDoiBong')
      .populate('maTranDau', 'diaDiem ngayBatDau')
      .populate('maMuaGiai', 'tenMuaGiai')
      .sort({ ngayBatDau: 1 });
  }

  async getLichTapByMa(maLichTapLuyen) {
    return await LichTapLuyen.findOne({ maLichTapLuyen })
      .populate('maDoiBong')
      .populate('maTranDau')
      .populate('maMuaGiai');
  }

  async getLichTapById(id) {
    return await LichTapLuyen.findById(id)
      .populate('maDoiBong')
      .populate('maTranDau')
      .populate('maMuaGiai');
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