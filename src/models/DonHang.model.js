const mongoose = require("mongoose");

const DonHangSchema = new mongoose.Schema({
  tenDangNhap: { type: String, required: true }, // tên đăng nhập của người dùng
  name: { type: String, required: true },     // người nhận
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
});

module.exports = mongoose.model("DonHang", DonHangSchema);
