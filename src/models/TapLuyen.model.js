// src/models/LichTapLuyen.model.js
const mongoose = require('mongoose');
const generateCode = require('../utils/generateCode');

const LichTapLuyenSchema = new mongoose.Schema({
  maLichTapLuyen: {
    type: String,
    required: true,
    unique: true,
    default: () => generateCode('LTL'),
  },
  maMuaGiai: {
    type: String,
    ref: 'MuaGiai',
    required: true,
  },
  maDoiBong: { 
    type: String,
    ref: 'DoiBong',
    required: true,
  },
  maTranDau: {
    type: String,
    ref: 'TranDau',
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