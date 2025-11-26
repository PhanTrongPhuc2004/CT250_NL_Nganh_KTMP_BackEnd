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

    // THÊM DÒNG NÀY – BẮT BUỘC PHẢI CÓ
    maCauHinhVe: {
        type: String,
        ref: 'CauHinhVe',
        required: true
    },

    loaiVe: { type: String, enum: ['VIP', 'Thuong', 'KhuyenMai'], default: 'Thuong' },
    khuVuc: { type: String, required: true },
    hangGhe: { type: String, required: true },
    soGhe: { type: String, required: true },
    giaVe: { type: Number, required: true },
    trangThai: {
        type: String,
        enum: ['cho_thanh_toan', 'da_thanh_toan', 'da_su_dung', 'da_huy'],
        default: 'cho_thanh_toan'
    },
    ngayMua: { type: Date, default: Date.now },
    qrCode: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Ve', VeSchema);