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
    nguoiGui: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NguoiDung',
        required: true,
    },

    // THỜI GIAN
    thoiGianTao: { type: Date, default: Date.now },
    thoiGianHetHan: { type: Date },

    // PHÂN LOẠI
    isPublic: { type: Boolean, default: false },
    loaiNguoiNhan: { type: String, enum: ['noiBo', 'congKhai'], default: 'noiBo' },

    // NỘI BỘ
    danhSachNhan: [{
        nguoiNhan: { type: mongoose.Schema.Types.ObjectId, ref: 'NguoiDung' },
        daDoc: { type: Boolean, default: false },
        thoiGianDoc: { type: Date }
    }],
    guiChoTatCa: { type: Boolean, default: false },
    maDoiHinh: { type: String, ref: 'DoiHinh' },

    // TRẠNG THÁI
    isActive: { type: Boolean, default: true }
}, { timestamps: true });

// Tự động tính thời gian hết hạn
ThongBaoSchema.pre('save', function (next) {
    if (!this.maThongBao) this.maThongBao = generateCode('TB');

    if (!this.thoiGianHetHan) {
        const duration = {
            'tapLuyen': 7 * 24 * 60 * 60 * 1000,
            'tranDau': 2 * 24 * 60 * 60 * 1000,
            'moBanVe': 14 * 24 * 60 * 60 * 1000,
            'quaLuuNiem': 30 * 24 * 60 * 60 * 1000,
            'suKien': 3 * 24 * 60 * 60 * 1000,
            'khac': 30 * 24 * 60 * 60 * 1000
        };
        this.thoiGianHetHan = new Date(Date.now() + (duration[this.loai] || duration.khac));
    }
    next();
});

// Middleware: Chỉ lấy thông báo active + chưa hết hạn
ThongBaoSchema.pre(['find', 'findOne'], function (next) {
    this.where({ isActive: true });
    this.where({ thoiGianHetHan: { $gt: new Date() } });
    next();
});

module.exports = mongoose.model('ThongBao', ThongBaoSchema);