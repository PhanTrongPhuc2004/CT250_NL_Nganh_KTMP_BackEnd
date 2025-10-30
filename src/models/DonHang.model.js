const mongoose = require("mongoose");

const DonHangSchema = new mongoose.Schema({
  tenDangNhap: { type: String, required: true }, // ✅ giữ nguyên
  name: { type: String, required: true },     
  phone: { type: String, required: true },
  address: { type: String, required: true },
  date: { type: Date, default: Date.now },
  total: { type: Number, required: true },
  cart: [
    {
      tenQuaLuuNiem: String,
      gia: Number,
      quantity: Number,
      anhMinhHoa: String,
    },
  ],
  status: { type: String, default: "Chờ xác nhận" }, // ✅ thêm cho admin
});

module.exports = mongoose.model("DonHang", DonHangSchema);
