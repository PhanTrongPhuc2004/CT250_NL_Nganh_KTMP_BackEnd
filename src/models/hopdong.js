const mongoose = require("mongoose");

// Định nghĩa schema cho Hợp đồng
const hopDongSchema = new mongoose.Schema(
  {
    maHopDong: {
      type: String,
      required: true,
      unique: true, // mã hợp đồng không trùng lặp
      trim: true,
    },
    ngayBatDau: {
      type: Date,
      required: true,
    },
    ngayKetThuc: {
      type: Date,
      required: true,
    },
    luong: {
      type: Number,
      required: true,
      min: 0,
    },
    dieuKhoan: {
      type: String,
      required: false,
      trim: true,
    },
    trangThai: {
      type: String,
      enum: ["Còn hiệu lực", "Hết hạn", "Đã chấm dứt", "Tạm hoãn"],
      default: "Còn hiệu lực",
    },
  },
  { timestamps: true }
);

// Tạo model từ schema
const HopDong = mongoose.model("HopDong", hopDongSchema);
module.exports = HopDong;
