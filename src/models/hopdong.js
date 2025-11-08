const mongoose = require("mongoose");

const HopDongSchema = new mongoose.Schema({
  // Thông tin chung
  maHopDong: { type: String, required: true, unique: true },
  tenDangNhap: { type: String, required: true }, // người tạo/quản lý hợp đồng

  // Thông tin cầu thủ
  tenCauThu: { type: String, required: true },
  quocTichCauThu: { type: String },
  viTriCauThu: { type: String }, // ví dụ: Tiền đạo, Hậu vệ, Thủ môn
  ngaySinhCauThu: { type: Date },
  diaChiCauThu: { type: String },
  sdtCauThu: { type: Number },

  // Thông tin CLB thuê
  tenCLBThue: { type: String, required: true },
  quocGiaCLBThue: { type: String },
  diaChiCLBThue: { type: String },

  // Thông tin CLB chủ quản (nếu cho mượn)
  tenCLBChuQuan: { type: String },
  quocGiaCLBChuQuan: { type: String },
  giaiDauCLBChuQuan: { type: String },

  // Thông tin hợp đồng
  ngayBatDau: { type: Date, required: true },
  ngayKetThuc: { type: Date, required: true },
  ngayKy: { type: Date },

  phiThue: { type: Number, required: true },
  luongCauThu: { type: Number, required: true },
  tienThuong: { type: Number, default: 0 },

  dieuKhoan: { type: String },
  nguoiDaiDien: { type: String },
  ghiChu: { type: String },

  trangThai: {
    type: String,
    enum: ["Chưa ký", "Đang hiệu lực", "Hết hạn"],
    default: "Chưa ký",
  },
}, { timestamps: true });

module.exports = mongoose.model("HopDong", HopDongSchema);
