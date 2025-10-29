const mongoose = require('mongoose');
const generateCode = require('../utils/generateCode');

const TranDauSchema = new mongoose.Schema({
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
  capDau: { type: [String], default: [] },
  doiHinhId: { type: mongoose.Schema.Types.ObjectId, ref: 'DoiHinh', required: true },
  giaVe: { type: Number, required: true, default: 200000 },
  soVeConLai: { type: Number, required: true, default: 1000 },
}, { timestamps: true });

TranDauSchema.pre('save', function (next) {
  if (!this.maTranDau) this.maTranDau = generateCode('TD');
  next();
});

module.exports = mongoose.model('TranDau', TranDauSchema);