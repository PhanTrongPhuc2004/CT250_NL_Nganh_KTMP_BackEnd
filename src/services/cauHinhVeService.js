// src/services/cauHinhVeService.js
const CauHinhVe = require('../models/CauHinhVe.model');

class CauHinhVeService {
    async create(data) {
        return await CauHinhVe.create(data);
    }

    async getAll() {
        return await CauHinhVe.find()
            .sort({ maTranDau: 1, khuVuc: 1, hangGhe: 1 });
    }

    async getByMa(maCauHinhVe) {
        return await CauHinhVe.findOne({ maCauHinhVe });
    }

    async getById(id) {
        return await CauHinhVe.findById(id);
    }

    async getByMaTranDau(maTranDau) {
        return await CauHinhVe.find({ maTranDau })
            .sort({ khuVuc: 1, hangGhe: 1 });
    }

    // Ví dụ trong service
    async updateById(id, data) {
        return await CauHinhVe.findByIdAndUpdate(
            id,
            data,
            { new: true, runValidators: true }
        );
    }

    async updateByMa(ma, data) {
        return await CauHinhVe.findOneAndUpdate(
            { maCauHinhVe: ma },
            data,
            { new: true, runValidators: true }
        );
    }

    async deleteByMa(maCauHinhVe) {
        return await CauHinhVe.findOneAndDelete({ maCauHinhVe });
    }

    async deleteById(id) {
        return await CauHinhVe.findByIdAndDelete(id);
    }

    // DÙNG TRONG MUA VÉ – GIẢM SỐ GHẾ CÒN LẠI
    async giamGheConLai(maCauHinhVe) {
        return await CauHinhVe.findOneAndUpdate(
            { maCauHinhVe, soGheConLai: { $gt: 0 } },
            { $inc: { soGheConLai: -1 } },
            { new: true }
        );
    }
}

module.exports = new CauHinhVeService();