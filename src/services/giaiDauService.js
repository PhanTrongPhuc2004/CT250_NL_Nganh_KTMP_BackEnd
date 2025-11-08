// src/services/giaiDauService.js
const GiaiDau = require('../models/GiaiDau.model');

class GiaiDauService {
  async createGiaiDau(data) {
    return await GiaiDau.create(data);
  }

  async getAllGiaiDau() {
    return await GiaiDau.find().sort({ createdAt: -1 });
  }

  async getGiaiDauByMa(maGiaiDau) {
    return await GiaiDau.findOne({ maGiaiDau });
  }

  async getGiaiDauById(id) {
    return await GiaiDau.findById(id);
  }

  async updateGiaiDauByMa(maGiaiDau, data) {
    return await GiaiDau.findOneAndUpdate({ maGiaiDau }, data, { new: true });
  }

  async updateGiaiDauById(id, data) {
    return await GiaiDau.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteGiaiDauByMa(maGiaiDau) {
    return await GiaiDau.findOneAndDelete({ maGiaiDau });
  }

  async deleteGiaiDauById(id) {
    return await GiaiDau.findByIdAndDelete(id);
  }
}

module.exports = new GiaiDauService();
