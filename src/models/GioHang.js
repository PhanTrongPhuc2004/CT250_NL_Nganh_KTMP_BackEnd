const mongoose = require("mongoose");

const GioHangItemSchema = new mongoose.Schema({
  maSanPham: { type: mongoose.Schema.Types.ObjectId, ref: "QuaLuuNiem", required: true },
  tenQuaLuuNiem: { type: String, required: true },
  gia: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  anhMinhHoa: { type: String },
});

const GioHangSchema = new mongoose.Schema(
  {
    tenDangNhap: { type: String, required: true, unique: true },
    cartItems: [GioHangItemSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("GioHang", GioHangSchema);
