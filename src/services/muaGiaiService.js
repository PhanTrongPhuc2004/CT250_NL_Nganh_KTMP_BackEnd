// src/services/muaGiaiService.js
const MuaGiai = require('../models/MuaGiai.model');

class MuaGiaiService {
    async createMuaGiai(data) {
        return await MuaGiai.create(data);
    }

    async getAllMuaGiai() {
        return await MuaGiai.find().populate('maGiaiDau', 'tenGiaiDau').sort({ ngayBatDau: 1 });
    }

    async getMuaGiaiByMa(maMuaGiai) {
        return await MuaGiai.findOne({ maMuaGiai }).populate('maGiaiDau');
    }

    async getMuaGiaiById(id) {
        return await MuaGiai.findById(id).populate('maGiaiDau');
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
}

module.exports = new MuaGiaiService();