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
        required: true,
    },
    soLuong: { type: Number, required: true, min: 1, max: 4 },
    gia: { type: Number, required: true },
    status: { type: String, enum: ['available', 'reserved', 'paid', 'used'], default: 'available' },
    qrCode: { type: String },
    ngayMua: { type: Date, default: Date.now },
}, { timestamps: true });

VeSchema.pre('save', function (next) {
    if (!this.maVe) this.maVe = generateCode('VE');
    next();
});

module.exports = mongoose.model('Ve', VeSchema);