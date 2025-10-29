const mongoose = require('mongoose');
const generateCode = require('../utils/generateCode');  // Giả định util này tồn tại từ phần người dùng
const Schema = mongoose.Schema;

const VeSchema = new Schema({
    maVe: {
        type: String,
        required: true,
        unique: true,
        default: () => generateCode('VE'),
    },
    maTranDau: {
        type: Schema.Types.ObjectId,
        ref: 'TranDau',  // Reference đến model TranDau (trận đấu) - giả định tồn tại
        required: true,
    },
    maNguoiDung: {
        type: Schema.Types.ObjectId,
        ref: 'NguoiDung',  // Reference đến người mua (fan)
        required: true,
    },
    soLuong: {
        type: Number,
        required: true,
        min: 1,
        max: 4,  // Giới hạn tối đa 4 vé/trận theo quy tắc nghiệp vụ
    },
    gia: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['available', 'reserved', 'paid', 'used'],  // Trạng thái vé
        default: 'available',
    },
    qrCode: {
        type: String,  // URL hoặc data URL của QR code
        default: null,
    },
    ngayMua: {
        type: Date,
        default: Date.now,
    },
});

// Middleware tự sinh mã nếu chưa có (tương tự NguoiDung)
VeSchema.pre('save', function (next) {
    if (!this.maVe) {
        this.maVe = generateCode('VE');
    }
    next();
});

module.exports = mongoose.models.Ve || mongoose.model('Ve', VeSchema);