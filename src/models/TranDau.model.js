// src/models/TranDau.model.js
const mongoose = require('mongoose');
const generateCode = require('../utils/generateCode');
const TranDauSchema = new mongoose.Schema(
  {
    maTranDau: {
      type: String,
      required: true,
      unique: true,
      default: () => generateCode('TD'),
    },
    maMuaGiai: {
      type: String,
      ref: 'MuaGiai',
      required: true,
    },

    diaDiem: { type: String, required: true, trim: true },
    ngayBatDau: { type: Date, required: true },
    thoiGian: { type: String, required: true, trim: true },
    maDoiHinh: {
      type: String,
      ref: 'DoiHinh',
      required: true, // Lưu mã đội hình của bảng đội hình
    },
    // ĐỘI NHÀ & ĐỘI KHÁCH
    doiNha: { type: String, ref: 'DoiBong', required: true }, // Dùng mã đội bóng này để đưa lên vé luôn, không truy xuất để lấy tên
    doiKhach: { type: String, ref: 'DoiBong', required: true }, // Dùng mã đội bóng này để đưa lên vé luôn, không truy xuất để lấy tên

  },
  { timestamps: true }
);

// TỰ ĐỘNG TẠO MÃ TRẬN ĐẤU
TranDauSchema.pre('save', function (next) {
  if (!this.maTranDau) this.maTranDau = generateCode('TD');
  next();
});

module.exports = mongoose.model('TranDau', TranDauSchema);
