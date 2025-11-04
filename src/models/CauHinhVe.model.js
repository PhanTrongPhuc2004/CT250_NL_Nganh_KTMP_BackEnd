// src/models/CauHinhVe.model.js
const mongoose = require('mongoose');
const generateCode = require('../utils/generateCode');

const CauHinhVeSchema = new mongoose.Schema({
    maCauHinhVe: {
        type: String,
        required: true,
        unique: true,
        default: () => generateCode('CHV') // CHV = Cấu hình vé
    },
    maTranDau: {
        type: String,
        ref: 'TranDau',
        required: true
    },
    loaiVe: {
        type: String,
        enum: ['VIP', 'Thuong', 'KhuyenMai'],
        required: true
    },
    khuVuc: { type: String, required: true },
    hangGhe: { type: String, required: true },
    soGheBatDau: { type: Number, required: true },
    soGheKetThuc: { type: Number, required: true },
    giaVe: { type: Number, required: true },
    tongSoGhe: { type: Number },
    soGheConLai: { type: Number }
}, { timestamps: true });

// TỰ TÍNH TỔNG GHẾ + TỰ TẠO MÃ
CauHinhVeSchema.pre('save', function (next) {
    if (!this.maCauHinhVe) {
        this.maCauHinhVe = generateCode('CHV');
    }
    const batDau = this.soGheBatDau;
    const ketThuc = this.soGheKetThuc;
    this.tongSoGhe = ketThuc - batDau + 1;
    if (this.isNew) {
        this.soGheConLai = this.tongSoGhe;
    }
    next();
});

module.exports = mongoose.model('CauHinhVe', CauHinhVeSchema);