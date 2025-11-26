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
    maCauThu: {
      type: String,
      ref: 'CauThu', // liên kết đến bảng cầu thủ
      required: true,
    },
    maTranDau: {
      type: String,
      ref: 'TranDau', // để biết thông số của trận nào
      required: true,
    },
  },
  {
    timestamps: true, // tự thêm createdAt, updatedAt
  }
);
module.exports = mongoose.Schema.ThongSoCauThu || mongoose.model('ThongSoCauThu', ThongSoCauThu);
