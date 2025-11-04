const mongoose = require("mongoose");

const MucHangSchema = new mongoose.Schema({
  maSanPham: { type: mongoose.Schema.Types.ObjectId, ref: "QuaLuuNiem", required: true },
  tenQuaLuuNiem: { type: String, required: true },
  gia: { type: Number, required: true },
  soLuong: { type: Number, default: 1, min: 1 },
});

const GioHangSchema = new mongoose.Schema({
  tenDangNhap: { type: String, required: true, unique: true },
  mucHangs: [MucHangSchema],
});

module.exports = mongoose.model("GioHang", GioHangSchema);
