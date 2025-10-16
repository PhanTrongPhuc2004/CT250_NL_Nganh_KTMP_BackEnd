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
    diaDiem: {
      type: String,
      required: true,
      trim: true,
    },
    thoiGianTapLuyen: {
      type: String, // dạng "07:30" hoặc "18:00"
      required: true,
      trim: true,
    },
    ngayDienRa: {
      type: Date,
      required: true,
    },
    noiDung: {
      type: String,
      required: false,
      trim: true,
    },
    tranDauId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TranDau', // tham chiếu đến model TranDau
      required: true,
    },
  },
  {
    timestamps: true, // tự động thêm createdAt & updatedAt
  }
);

// 🧩 Tự sinh mã nếu chưa có
LichTapLuyenSchema.pre('save', function (next) {
  if (!this.maLichTapLuyen) {
    this.maLichTapLuyen = generateCode('LTL');
  }
  next();
});

module.exports = mongoose.models.LichTapLuyen || mongoose.model('TapLuyen', LichTapLuyenSchema);
