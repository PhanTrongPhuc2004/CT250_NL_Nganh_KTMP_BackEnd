// src/models/TapLuyen.model.js
const mongoose = require('mongoose');
const generateCode = require('../utils/generateCode');

const LichTapLuyenSchema = new mongoose.Schema({
  maLichTapLuyen: {
    type: String,
    required: true,
    unique: true,
    default: () => generateCode('LTL'),
  },
  maTranDau: {
    type: String,
    ref: 'TranDau',
    required: true,
  },
  maDoiHinh: {
    type: String,
    ref: 'DoiHinh',
    required: true,
  },
  diaDiem: { type: String, required: true, trim: true },
  ngayBatDau: { type: Date, required: true },
  thoiGian: { type: String, required: true, trim: true },
  noiDung: { type: String, trim: true },
}, { timestamps: true });

LichTapLuyenSchema.pre('save', function (next) {
  if (!this.maLichTapLuyen) this.maLichTapLuyen = generateCode('LTL');
  next();
});

module.exports = mongoose.model('LichTapLuyen', LichTapLuyenSchema);