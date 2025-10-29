const mongoose = require("mongoose");
const generateCode = require('../utils/generateCode');

const lichTrinhSchema = new mongoose.Schema({
  maLichTrinh: {
    type: String,
    required: true,
    unique: true,
    default: () => generateCode('LT'),
  },
  maMuaGiai: {
    type: String,
    ref: 'MuaGiai',
    required: true,
  },
  diaDiem: { type: String, required: true, trim: true },
  ngayBatDau: { type: Date, required: true },
  thoiGian: { type: String, required: true, trim: true },
}, { timestamps: true });

lichTrinhSchema.pre('save', function (next) {
  if (!this.maLichTrinh) this.maLichTrinh = generateCode('LT');
  next();
});

module.exports = mongoose.model("LichTrinh", lichTrinhSchema);