const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KetQuaTranDauSchema = new Schema(
  {
    maTranDau: {
      type: String,
      ref: 'TranDau',
      required: true,
      unique: true,
    },
    tiSo: {
      type: String, // Đổi từ Array thành String (ví dụ: "2-1")
      required: true,
    },
    // THÊM CÁC TRƯỜNG BẠN ĐANG GỬI TỪ FRONTEND
    doiNha_tiLeKiemSoatBong: { type: Number, default: 0 },
    doiNha_soDuongChuyen: { type: Number, default: 0 },
    doiNha_soPhaPhamLoi: { type: Number, default: 0 },
    doiNha_soTheVang: { type: Number, default: 0 },
    doiNha_soTheDo: { type: Number, default: 0 },
    doiNha_soCauThu: { type: Number, default: 0 },
    doiKhach_tiLeKiemSoatBong: { type: Number, default: 0 },
    doiKhach_soDuongChuyen: { type: Number, default: 0 },
    doiKhach_soPhaPhamLoi: { type: Number, default: 0 },
    doiKhach_soTheVang: { type: Number, default: 0 },
    doiKhach_soTheDo: { type: Number, default: 0 },
    doiKhach_soCauThu: { type: Number, default: 0 },
    // GIỮ LẠI CÁC TRƯỜNG CŨ (nếu cần)
    tiLeKiemSoatBong: {
      type: [Number], // Array of numbers [doiNha, doiKhach]
      default: [0, 0],
    },
    soTheVang: {
      type: Number,
      default: 0,
    },
    soTheDo: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // Thêm timestamps
  }
);

// SỬA LẠI EXPORT - BẠN ĐANG EXPORT SAI
module.exports =
  mongoose.models.KetQuaTranDau || mongoose.model('KetQuaTranDau', KetQuaTranDauSchema);
