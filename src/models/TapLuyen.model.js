// src/models/TapLuyen.model.js
const mongoose = require('mongoose');
const generateCode = require('../utils/generateCode');

const LichTapLuyenSchema = new mongoose.Schema(
  {
    maLichTapLuyen: {
      type: String,
      required: true,
      unique: true,
      default: () => generateCode('LTL'),
    },
    maTranDau: {
      type: String,
      ref: 'TranDau',
      required: false,
    },
    maDoiHinh: {
      type: String,                    // ĐỔI THÀNH String
      ref: 'DoiHinh',
      required: true,
    },
    diaDiem: { type: String, required: true, trim: true },
    ngayBatDau: { type: Date, required: true },
    thoiGian: { type: String, required: true, trim: true },
    noiDung: { type: String, trim: true },
    ghiChu: { type: String, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('LichTapLuyen', LichTapLuyenSchema);