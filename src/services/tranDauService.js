// src/services/tranDauService.js
const TranDau = require('../models/TranDau.model');

class TranDauService {
  async createTranDau(data) {
    return await TranDau.create(data);
  }

  async getAllTranDau() {
    return await TranDau.find().sort({ ngayBatDau: 1 });
  }

  async getTranDauByMa(maTranDau) {
    return await TranDau.findOne({ maTranDau });
  }

  async getTranDauById(id) {
    return await TranDau.findById(id);
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