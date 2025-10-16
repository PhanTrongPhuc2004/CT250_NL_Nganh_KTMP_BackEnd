const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ThongSoCauThu = new Schema(
  {
    soLanChamBong: {
      type: Number,
      required: true,
      min: 0,
    },
    soLanDutDiem: {
      type: Number,
      required: true,
      min: 0,
    },
    soLanCanPha: {
      type: Number,
      required: true,
      min: 0,
    },
    soLanGhiBan: {
      type: Number,
      required: true,
      min: 0,
    },
    banDoThanNhiet: {
      type: String, // Text => String
      required: false, // Có thể không bắt buộc
    },
    cauThuId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CauThu', // liên kết đến bảng cầu thủ
      required: true,
    },
    tranDauId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TranDau', // để biết thông số của trận nào
      required: true,
    },
  },
  {
    timestamps: true, // tự thêm createdAt, updatedAt
  }
);
module.exports = mongoose.Schema.ThongSoCauThu || mongoose.model('ThongSoCauThu', ThongSoCauThu);
