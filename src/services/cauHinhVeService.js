// src/services/cauHinhVeService.js
const CauHinhVe = require('../models/CauHinhVe.model');

class CauHinhVeService {
    async create(data) {
        return await CauHinhVe.create(data);
    }

    async getAll() {
        return await CauHinhVe.find()
            .populate('maTranDau', 'diaDiem ngayBatDau')
            .sort({ maTranDau: 1, khuVuc: 1, hangGhe: 1 });
    }

    async getByMa(maCauHinhVe) {
        return await CauHinhVe.findOne({ maCauHinhVe }).populate('maTranDau');
    }

    async getById(id) {
        return await CauHinhVe.findById(id).populate('maTranDau');
    }

    async getByMaTranDau(maTranDau) {
        return await CauHinhVe.find({ maTranDau }).sort({ khuVuc: 1, hangGhe: 1 });
    }

    async updateByMa(maCauHinhVe, data) {
        return await CauHinhVe.findOneAndUpdate({ maCauHinhVe }, data, { new: true });
    }

    async updateById(id, data) {
        return await CauHinhVe.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteByMa(maCauHinhVe) {
        return await CauHinhVe.findOneAndDelete({ maCauHinhVe });
    }

    async deleteById(id) {
        return await CauHinhVe.findByIdAndDelete(id);
    }

    // DÙNG TRONG MUA VÉ
    async giamGheConLai(maCauHinhVe) {
        return await CauHinhVe.findOneAndUpdate(
            { maCauHinhVe, soGheConLai: { $gt: 0 } },
            { $inc: { soGheConLai: -1 } },
            { new: true }
        );
    }
}

module.exports = new CauHinhVeService();