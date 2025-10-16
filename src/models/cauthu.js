const mongoose = require('mongoose');
const NguoiDung = require('./NguoiDung.model');
// Định nghĩa schema cho Cầu thủ
const cauthuSchema = new mongoose.Schema({
  diaChi: {
    type: String,
    required: false, // có thể không bắt buộc
    trim: true,
  },
  namSinh: {
    type: Date, // Ngày tháng năm sinh
    required: true,
  },
  chieuCao: {
    type: Number, // chiều cao (cm)
    required: false,
    min: 100,
    max: 250,
  },
  viTri: {
    type: String, // vị trí thi đấu
    required: true,
    enum: ['Thủ môn', 'Hậu vệ', 'Tiền vệ', 'Tiền đạo'], // giới hạn các giá trị
  },
  quocTich: {
    type: String,
    required: true,
    trim: true,
  },
  sdt: {
    type: String,
    required: false,
    match: [/^[0-9]{9,11}$/, 'Số điện thoại không hợp lệ'], // kiểm tra định dạng
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Email không hợp lệ'], // regex email cơ bản
  },
  soAo: {
    type: Number, // số áo
    required: true,
    min: 1,
    max: 99,
  },
  chanThuan: {
    type: String, // chân thuận
    enum: ['Trái', 'Phải', 'Cả hai'],
    default: 'Phải',
  },
  cauLacBoCu: {
    type: String, // câu lạc bộ cũ
    trim: true,
  },
  namHanhNghe: {
    type: Number, // số năm hành nghề
    min: 0,
    max: 50,
    default: 0,
  },
  ngayGiaNhap: {
    type: Date,
    default: Date.now, // ngày gia nhập
  },
  anhMinhHoa: {
    type: String, // lưu đường dẫn ảnh hoặc URL
    required: false,
  },
  doiHinhId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DoiHinh', // tham chiếu tới collection Lineup
    required: true, // nếu cầu thủ nào cũng phải thuộc 1 đội hình
  },
});

// Tạo model từ schema
module.exports = NguoiDung.discriminator('CauThu', cauthuSchema);
