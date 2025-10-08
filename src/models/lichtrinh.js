const mongoose = require("mongoose");

// Định nghĩa schema cho Lịch Trình
const lichTrinhSchema = new mongoose.Schema(
  {
    maLichTrinh: {
      type: String,
      required: true,
      unique: true, // không trùng mã
      trim: true,
    },
    diaDiem: {
      type: String,
      required: true,
      trim: true,
    },
    ngayBatDau: {
      type: Date,
      required: true,
    },
    thoiGian: {
      type: String, // ví dụ: "08:00 - 10:00" hoặc "Buổi chiều"
      required: true,
      trim: true,
    },
  },
  { timestamps: true } // tự động thêm createdAt, updatedAt
);

// Tạo model
const LichTrinh = mongoose.model("LichTrinh", lichTrinhSchema);
module.exports = LichTrinh;
