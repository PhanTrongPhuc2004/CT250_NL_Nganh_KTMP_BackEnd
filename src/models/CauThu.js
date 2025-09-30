// models/CauThu.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CauThuSchema = new Schema(
  {
    MaCauThu: {
      type: String,
      required: true,
      unique: true, // mã cầu thủ phải duy nhất
    },
    ten: {
      type: String,
      required: true,
    },
    diaChi: {
      type: String,
    },
    namHanhNghe: {
      type: String,
    },
    cauLacBoCu: {
      type: String,
    },
    chieuCao: {
      type: Number, // Float
    },
    viTri: {
      type: String,
    },
    chanThuan: {
      type: String,
      enum: ['L', 'R'], // nếu chỉ Left/Right, hoặc bỏ enum nếu không cần
    },
    quocTich: {
      type: String,
    },
    sdt: {
      type: String,
    },
    email: {
      type: String,
    },
    soAo: {
      type: Number,
    },
    ngayGiaNhap: {
      type: Date,
    },
    anhMinhHoa: {
      type: String, // URL hoặc base64
    },
  },
  {
    timestamps: true, // tạo createdAt & updatedAt
  }
);

module.exports = mongoose.models.CauThu || mongoose.model('CauThu', CauThuSchema);
