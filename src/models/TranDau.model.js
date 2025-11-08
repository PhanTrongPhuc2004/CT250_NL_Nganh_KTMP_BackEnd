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
      require: true,
    },
    // ĐỘI NHÀ & ĐỘI KHÁCH
    doiNha: { type: String, ref: 'DoiBong', required: true },
    doiKhach: { type: String, ref: 'DoiBong', required: true },

    // // TRẠNG THÁI TRẬN ĐẤU
    // trangThai: {
    //   type: String,
    //   enum: ['chuaDienRa', 'dangDienRa', 'daKetThuc'],
    //   default: 'chuaDienRa',
    // },

    // KẾT QUẢ – TÁCH RIÊNG TỈ SỐ
    ketQua: {
      doiNha: { type: Number, default: null }, // Số bàn thắng đội nhà
      doiKhach: { type: Number, default: null }, // Số bàn thắng đội khách
    },
  },
  { timestamps: true }
);

// TỰ ĐỘNG TẠO MÃ TRẬN ĐẤU
TranDauSchema.pre('save', function (next) {
  if (!this.maTranDau) this.maTranDau = generateCode('TD');
  next();
});

module.exports = mongoose.model('TranDau', TranDauSchema);
