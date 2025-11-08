// src/services/doiBongService.js
const DoiBong = require('../models/DoiBong.model');

class DoiBongService {
    async createDoiBong(data) {
        return await DoiBong.create(data);
    }

    async getAllDoiBong() {
        return await DoiBong.find().sort({ tenDoiBong: 1 });
    }

    async getDoiBongByMa(maDoiBong) {
        return await DoiBong.findOne({ maDoiBong });
    }

    async getDoiBongById(id) {
        return await DoiBong.findById(id);
    }

    async updateDoiBongByMa(maDoiBong, data) {
        return await DoiBong.findOneAndUpdate({ maDoiBong }, data, { new: true });
    }

    async updateDoiBongById(id, data) {
        return await DoiBong.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteDoiBongByMa(maDoiBong) {
        return await DoiBong.findOneAndDelete({ maDoiBong });
    }

    async deleteDoiBongById(id) {
        return await DoiBong.findByIdAndDelete(id);
    }
}

module.exports = new DoiBongService();