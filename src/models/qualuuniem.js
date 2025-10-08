const mongoose = require("mongoose");

// Định nghĩa schema cho Quà lưu niệm
const qualuuniemSchema = new mongoose.Schema(
  {
    tenQuaLuuNiem: {
      type: String,
      required: true, // tên là bắt buộc
      trim: true,
    },
    gia: {
      type: Number,
      required: true, // giá là bắt buộc
      min: 0,
    },
    moTa: {
      type: String,
      required: false, // có thể để trống
      trim: true,
    },
    anhMinhHoa: {
      type: String, // URL hoặc đường dẫn ảnh
      required: false,
      trim: true,
    },
  },
  { timestamps: true } // tự động tạo createdAt, updatedAt
);

// Tạo model từ schema
const Qualuuniem = mongoose.model("Qualuuniem", qualuuniemSchema);

module.exports = Qualuuniem;
