const mongoose = require('mongoose');
const generateCode = require('../utils/generateCode');

const CauLacBoSchema = new mongoose.Schema({
  maCauLacBo: {
    type: String,
    required: true,
    unique: true,
    default: () => generateCode('CLB'),
  },
  ten: {
    type: String,
    required: true,
    trim: true,
  },
  namThanhLap: {
    type: Number, // năm thôi là đủ, không cần cả Date
    required: true,
  },
  diaChi: {
    type: String,
    trim: true,
  },
  lienHe: {
    email: { type: String, trim: true },
    soDienThoai: { type: String, trim: true },
    website: { type: String, trim: true },
  },
  moTa: {
    type: String,
    trim: true,
  },
  slogan: {
    type: String,
  },
  nhaTaiTro: {
    type: Array,
    default: [],
  },
  logo: {
    type: String, // URL hình ảnh
    trim: true,
  },
  sanNha: {
    ten: { type: String, trim: true },
    diaChi: { type: String, trim: true },
    sucChua: { type: Number },
  },
});

// 🧩 Sinh mã CLB tự động
CauLacBoSchema.pre('save', function (next) {
  if (!this.maCauLacBo) {
    this.maCauLacBo = generateCode('CLB');
  }
  next();
});

module.exports = mongoose.models.CauLacBo || mongoose.model('CauLacBo', CauLacBoSchema);
