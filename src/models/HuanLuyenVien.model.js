const mongoose = require('mongoose');
const NguoiDung = require('./NguoiDung.model');

const { Schema } = mongoose;

const HuanLuyenVienSchema = new Schema({
  diaChi: { type: String },
  namHanhNghe: { type: String },
  cauLacBoCu: { type: String },
  quocTich: { type: String },
  ngayGiaNhap: { type: Date },
  anhMinhHoa: { type: String },
  namSinh: { type: Number },
  doiHinhId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DoiHinh', // tham chiếu tới collection Lineup
    required: true, // nếu cầu thủ nào cũng phải thuộc 1 đội hình
  },
  cauLacBoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CauLacBo', // tham chiếu tới collection Lineup
      required: true, // nếu cầu thủ nào cũng phải thuộc 1 đội hình
    },
});

// Kế thừa từ NguoiDung
const HuanLuyenVien = NguoiDung.discriminator('HuanLuyenVien', HuanLuyenVienSchema);

module.exports = HuanLuyenVien;
