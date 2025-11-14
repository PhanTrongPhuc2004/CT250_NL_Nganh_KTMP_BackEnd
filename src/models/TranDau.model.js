// src/models/TranDau.model.js
const mongoose = require('mongoose');
const generateCode = require('../utils/generateCode');

const createStatusMatch = (ngayBatDau, thoiGian) => {
  const today = new Date();

  // Tạo đối tượng ngày giờ bắt đầu từ ngàyBatDau và thoiGian
  const [gio, phut] = thoiGian.split(':').map(Number);
  const ngayGioBatDau = new Date(ngayBatDau);
  ngayGioBatDau.setHours(gio, phut, 0, 0);

  // Tính thời gian kết thúc (giả sử trận đấu kéo dài 2 tiếng)
  const ngayGioKetThuc = new Date(ngayGioBatDau);
  ngayGioKetThuc.setHours(ngayGioKetThuc.getHours() + 2);

  if (today < ngayGioBatDau) return 'chua_bat_dau';
  if (today >= ngayGioBatDau && today <= ngayGioKetThuc) return 'dang_dien_ra';
  return 'ket_thuc';
};

const TranDauSchema = new mongoose.Schema(
  {
    maTranDau: {
      type: String,
      default: () => generateCode('TD'),
      required: true,
      unique: true,
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
      required: true,
    },
    doiNha: { type: String, ref: 'DoiBong', required: true },
    doiKhach: { type: String, ref: 'DoiBong', required: true },
    trangThai: {
      type: String,
      enum: ['chua_bat_dau', 'dang_dien_ra', 'ket_thuc'],
      default: 'chua_bat_dau', // THÊM DEFAULT
    },
  },
  { timestamps: true }
);

// SỬA PRE-SAVE HOOK
TranDauSchema.pre('save', function (next) {
  // 1. Tạo mã trận đấu nếu chưa có
  if (!this.maTranDau) {
    this.maTranDau = generateCode('TD');
  }

  // 2. CHỈ tính trạng thái tự động khi:
  // - Document mới được tạo (isNew)
  // - VÀ trạng thái chưa được set thủ công (vẫn là giá trị mặc định)
  if (this.trangThai !== 'ket_thuc' && this.ngayBatDau && this.thoiGian) {
    const calculatedStatus = createStatusMatch(this.ngayBatDau, this.thoiGian);
    this.trangThai = calculatedStatus;
  }

  next();
});

module.exports = mongoose.model('TranDau', TranDauSchema);
