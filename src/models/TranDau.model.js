const mongoose = require('mongoose');
const genrateCode = require('../utils/generateCode');
const TranDauSchema = new mongoose.Schema(
  {
    maTranDau: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      default: () => genrateCode('TD'),
    },
    diaDiem: {
      type: String,
      required: false,
      trim: true,
    },
    ngayDienRa: {
      type: Date,
      required: false,
    },
    capDau: {
      type: Array,
      required: false,
      trim: true,
    },
    thoiGianDienRa: {
      type: String,
      required: false,
      trim: true,
    },
    doiHinhId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DoiHinh', // tham chiếu tới collection Lineup
      required: true,
    },
    giaiDauId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'GiaiDau', // tham chiếu tới collection Lineup
      required: true,
    },
  },
  {
    timestamps: true, // tự động thêm createdAt & updatedAt
  }
);

module.exports = mongoose.model('TranDau', TranDauSchema);
