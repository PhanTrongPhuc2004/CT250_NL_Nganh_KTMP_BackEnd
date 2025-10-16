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
    type: Date,
    required: true,
  },
  diaChi: {
    type: String,
    required: false,
    trim: true,
  },
  lienHe: {
    type: String,
    required: false,
    trim: true,
  },
  moTa: {
    type: String,
    required: false,
    trim: true,
  },
});

// 🧩 Tự sinh mã CLB nếu chưa có
CauLacBoSchema.pre('save', function (next) {
  if (!this.maCauLacBo) {
    this.maCauLacBo = generateCode('CLB');
  }
  next();
});

module.exports = mongoose.models.CauLacBo || mongoose.model('CauLacBo', CauLacBoSchema);
