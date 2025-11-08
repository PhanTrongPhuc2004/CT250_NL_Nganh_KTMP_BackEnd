// src/services/veService.js
const Ve = require('../models/Ve.model');
const CauHinhVe = require('../models/CauHinhVe.model');
const TranDau = require('../models/TranDau.model');
const DoiBong = require('../models/DoiBong.model');
const QRCode = require('qrcode');

// HÀM FORMAT TRẠNG THÁI (THÊM MỚI)
const formatStatus = (status) => {
    const map = {
        cho_thanh_toan: 'Chờ thanh toán',
        da_thanh_toan: 'Đã thanh toán',
        da_su_dung: 'Đã sử dụng',
        da_huy: 'Đã hủy'
    };
    return map[status] || status;
};

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

        // CHỈ LƯU maTranDau → ĐỦ ĐỂ JOIN SAU NÀY
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
        const ves = await Ve.find({ maNguoiDung: userId }).lean().sort({ ngayMua: -1 });

        const result = await Promise.all(
            ves.map(async (ve) => {
                let doiNha = 'Chưa xác định';
                let doiKhach = 'Chưa xác định';
                let ngayBatDau = null;
                let sanDau = 'Chưa xác định';
                let qrCode = ve.qrCode;

                // CHỈ JOIN TRẬN ĐẤU → KHÔNG JOIN ĐỘI BÓNG
                const tranDau = await TranDau.findOne({ maTranDau: ve.maTranDau }).lean();

                if (tranDau) {
                    doiNha = tranDau.doiNha;     // ← Dùng MÃ đội nhà
                    doiKhach = tranDau.doiKhach; // ← Dùng MÃ đội khách
                    ngayBatDau = tranDau.ngayBatDau;
                    sanDau = tranDau.diaDiem || 'Chưa xác định';
                }

                // SINH QR DỰA TRÊN MÃ ĐỘI (không cần tên)
                if (!qrCode) {
                    const qrData = `
MÃ VÉ: ${ve.maVe}
TRẬN: ${doiNha} vs ${doiKhach}
THỜI GIAN: ${ngayBatDau ? new Date(ngayBatDau).toLocaleString('vi-VN') : 'Chưa có'}
SÂN: ${sanDau}
GHẾ: ${ve.khuVuc}${ve.hangGhe}-${ve.soGhe}
LOẠI: ${ve.loaiVe}
GIÁ: ${ve.giaVe.toLocaleString()}đ
TRẠNG THÁI: ${formatStatus(ve.trangThai)}
                `.trim();

                    try {
                        qrCode = await QRCode.toDataURL(qrData, {
                            width: 300,
                            margin: 2,
                            color: { dark: '#8B2C31', light: '#FFF' }
                        });
                        await Ve.updateOne({ _id: ve._id }, { qrCode });
                    } catch (err) {
                        console.error('Lỗi sinh QR:', err);
                        qrCode = null;
                    }
                }

                return {
                    ...ve,
                    doiNha,     
                    doiKhach,   
                    ngayBatDau,
                    sanDau,
                    qrCode
                };
            })
        );

        return result;
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