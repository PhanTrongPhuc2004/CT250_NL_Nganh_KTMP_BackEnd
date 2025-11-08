// src/models/ThongBao.model.js
const mongoose = require('mongoose');
const generateCode = require('../utils/generateCode');

const ThongBaoSchema = new mongoose.Schema({
    maThongBao: {
        type: String,
        unique: true,
        default: () => generateCode('TB'),
    },
    tieuDe: { type: String, required: true, trim: true },
    noiDung: { type: String, required: true, trim: true },
    loai: {
        type: String,
        enum: ['tapLuyen', 'tranDau', 'lichTrinh', 'ghiChu', 'moBanVe', 'quaLuuNiem', 'suKien', 'khac'],
        default: 'khac',
    },
    maNguoiGui: { type: String, required: true }, // String mã

    thoiGianTao: { type: Date, default: Date.now },
    thoiGianHetHan: { type: Date },

    isPublic: { type: Boolean, default: false },
    loaiNguoiNhan: { type: String, enum: ['noiBo', 'congKhai'], default: 'noiBo' },

    danhSachNhan: [{
        maNguoiNhan: { type: String }, // String mã
        daDoc: { type: Boolean, default: false },
        thoiGianDoc: { type: Date }
    }],
    guiChoTatCa: { type: Boolean, default: false },
    maDoiHinh: { type: String },

    isActive: { type: Boolean, default: true }
}, { timestamps: true });

// Tự động tạo mã + hết hạn
ThongBaoSchema.pre('save', function (next) {
    if (!this.maThongBao) this.maThongBao = generateCode('TB');
    if (!this.thoiGianHetHan) {
        const duration = {
            'tapLuyen': 7, 'tranDau': 2, 'moBanVe': 14,
            'quaLuuNiem': 30, 'suKien': 3, 'khac': 30
        };
        this.thoiGianHetHan = new Date(Date.now() + (duration[this.loai] || 30) * 24 * 60 * 60 * 1000);
    }
    next();
});

// Chỉ lấy active + chưa hết hạn
ThongBaoSchema.pre(['find', 'findOne'], function (next) {
    this.where({ isActive: true });
    this.where({ thoiGianHetHan: { $gt: new Date() } });
    next();
});

module.exports = mongoose.model('ThongBao', ThongBaoSchema);