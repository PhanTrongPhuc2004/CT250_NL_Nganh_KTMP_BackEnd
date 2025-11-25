const mongoose = require('mongoose');
const generateCode = require('../utils/generateCode');
const Schema = mongoose.Schema;
const NguoiDung = new Schema({
  maNguoiDung: {
    type: String,
    required: true,
    unique: true, // mã người dùng phải duy nhất
    default: () => generateCode('ND'),
  },
  anhMinhHoa:{
    type: String,
    default: 'https://res.cloudinary.com/dq2t6s6jk/image/upload/v1696118283/default-avatar_qxgnby.png',
  },
  hoVaTen: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  tenDangNhap: {
    type: String,
    required: true,
  },
  matKhau: {
    type: String,
    required: true,
  },
  vaiTro: {
    type: String,
    default: 'nguoihammo',
  },
  diaChi: {
    type: String,
    default: 'Khong',
  },
  refreshToken: {
    type: String,
    default: '',
  },
});

// 🧩 Middleware tự sinh mã nếu chưa có
NguoiDung.pre('save', function (next) {
  if (!this.maNguoiDung) {
    // Nếu là fan, prefix là FAN, nếu không thì ND
    const prefix = this.vaiTro?.toUpperCase();
    this.maNguoiDung = generateCode(prefix);
  }
  next();
});

module.exports = mongoose.models.NguoiDung || mongoose.model('NguoiDung', NguoiDung);
