// src/services/tranDauService.js
const TranDau = require('../models/TranDau.model');

class TranDauService {
  async createTranDau(data) {
    return await TranDau.create(data);
  }

  async getAllTranDau() {
    return await TranDau.find()
      .populate('doiNha', 'tenDoiBong logoUrl')
      .populate('doiKhach', 'tenDoiBong logoUrl')
      .populate('maMuaGiai', 'tenMuaGiai')
      .sort({ ngayBatDau: 1 });
  }

  async getTranDauByMa(maTranDau) {
    return await TranDau.findOne({ maTranDau })
      .populate('doiNha', 'tenDoiBong logoUrl')
      .populate('doiKhach', 'tenDoiBong logoUrl')
      .populate('maMuaGiai');
  }

  async getTranDauById(id) {
    return await TranDau.findById(id)
      .populate('doiNha', 'tenDoiBong logoUrl')
      .populate('doiKhach', 'tenDoiBong logoUrl')
      .populate('maMuaGiai');
  }

  async updateTranDauByMa(maTranDau, data) {
    return await TranDau.findOneAndUpdate({ maTranDau }, data, { new: true });
  }

  async updateTranDauById(id, data) {
    return await TranDau.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteTranDauByMa(maTranDau) {
    return await TranDau.findOneAndDelete({ maTranDau });
  }

  async deleteTranDauById(id) {
    return await TranDau.findByIdAndDelete(id);
  }
}

module.exports = new TranDauService();