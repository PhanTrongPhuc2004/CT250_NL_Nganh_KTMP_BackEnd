// src/models/Ve.model.js
const mongoose = require('mongoose');
const generateCode = require('../utils/generateCode');

const VeSchema = new mongoose.Schema({
    maVe: {
        type: String,
        required: true,
        unique: true,
        default: () => generateCode('VE'),
    },
    maTranDau: {
        type: String,
        ref: 'TranDau',
        required: true,
    },
    maNguoiDung: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NguoiDung',
    },

    // THÊM MỚI
    loaiVe: { type: String, enum: ['VIP', 'Thuong', 'KhuyenMai'], default: 'Thuong' },
    khuVuc: { type: String, required: true },     // A, B, C...
    hangGhe: { type: String, required: true },    // 1, 2, 3...
    soGhe: { type: String, required: true },      // 12, 13...
    giaVe: { type: Number, required: true },
    trangThai: {
        type: String,
        enum: ['cho_thanh_toan', 'da_thanh_toan', 'da_su_dung', 'da_huy'],
        default: 'cho_thanh_toan'
    },
    ngayMua: { type: Date, default: Date.now },

    // XÓA: soLuong, gia, status, qrCode → chuyển sang controller nếu cần
}, { timestamps: true });

VeSchema.pre('save', function (next) {
    if (!this.maVe) this.maVe = generateCode('VE');
    next();
});

module.exports = mongoose.model('Ve', VeSchema);