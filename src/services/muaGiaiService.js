// src/services/muaGiaiService.js
const MuaGiai = require('../models/MuaGiai.model');
const TranDau = require('../models/TranDau.model');
class MuaGiaiService {
  async createMuaGiai(data) {
    return await MuaGiai.create(data);
  }

  async getAllMuaGiai() {
    return await MuaGiai.find().sort({ ngayBatDau: 1 });
  }

  async getMuaGiaiByMa(maGiaiDau) {
    return await MuaGiai.findOne({ maGiaiDau });
  }

  async getMuaGiaiById(id) {
    return await MuaGiai.findById(id);
  }

  async updateMuaGiaiByMa(maMuaGiai, data) {
    return await MuaGiai.findOneAndUpdate({ maMuaGiai }, data, { new: true });
  }

  async updateMuaGiaiById(id, data) {
    return await MuaGiai.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteMuaGiaiByMa(maMuaGiai) {
    return await MuaGiai.findOneAndDelete({ maMuaGiai });
  }

  async deleteMuaGiaiById(id) {
    return await MuaGiai.findByIdAndDelete(id);
  }
  async getTranDauByMaMuaGiai(maMuaGiai) {
    // console.log('lay danh sach tran dau co ma mua giai', maMuaGiai);
    return await TranDau.find({ maMuaGiai });
  }
  async getMuaGiaiByMaGiaiDau(maGiaiDau) {
    return await MuaGiai.find({ maGiaiDau });
  }
}

module.exports = new MuaGiaiService();
