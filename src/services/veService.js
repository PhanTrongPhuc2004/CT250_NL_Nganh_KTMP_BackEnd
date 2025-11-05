// src/services/veService.js
const Ve = require('../models/Ve.model');
const CauHinhVe = require('../models/CauHinhVe.model');

class VeService {
    // MUA VÉ TỰ ĐỘNG
    async muaVe(data, userId) {
        const { maTranDau, loaiVe, khuVuc, hangGhe } = data;

        const config = await CauHinhVe.findOne({
            maTranDau,
            loaiVe,
            khuVuc,
            hangGhe
        });

        if (!config) throw new Error('Không tìm thấy cấu hình vé');
        if (config.soGheConLai <= 0) throw new Error('Hết vé khu vực này');

        const daBan = await Ve.find(
            { maTranDau, khuVuc, hangGhe },
            { soGhe: 1 }
        ).sort({ soGhe: 1 });

        const daBanSet = new Set(daBan.map(v => parseInt(v.soGhe)));
        let soGhe;

        for (let i = config.soGheBatDau; i <= config.soGheKetThuc; i++) {
            if (!daBanSet.has(i)) {
                soGhe = i.toString();
                break;
            }
        }

        if (!soGhe) throw new Error('Không còn ghế trống');

        const ve = await Ve.create({
            maTranDau,
            maNguoiDung: userId,
            loaiVe: config.loaiVe,
            khuVuc,
            hangGhe,
            soGhe,
            giaVe: config.giaVe,
            trangThai: 'da_thanh_toan'
        });

        await CauHinhVe.updateOne(
            { _id: config._id },
            { $inc: { soGheConLai: -1 } }
        );

        return ve;
    }

    // KHÔNG DÙNG .populate()
    async getAllVe() {
        return await Ve.find().sort({ ngayMua: -1 });
    }

    async getVeByUser(userId) {
        return await Ve.find({ maNguoiDung: userId }).sort({ ngayMua: -1 });
    }

    async getVeByMa(maVe) {
        return await Ve.findOne({ maVe });
    }

    async getVeById(id) {
        return await Ve.findById(id);
    }

    async getVeByMaTranDau(maTranDau) {
        return await Ve.find({ maTranDau }).sort({ khuVuc: 1, hangGhe: 1, soGhe: 1 });
    }

    async updateVeByMa(maVe, data) {
        return await Ve.findOneAndUpdate({ maVe }, data, { new: true });
    }

    async updateVeById(id, data) {
        return await Ve.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteVeByMa(maVe) {
        return await Ve.findOneAndDelete({ maVe });
    }

    async deleteVeById(id) {
        return await Ve.findByIdAndDelete(id);
    }
}

module.exports = new VeService();