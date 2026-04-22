const mongoose = require("mongoose");

const qualuuniemSchema = new mongoose.Schema(
  {
    tenQuaLuuNiem: {
      type: String,
      required: true,
      trim: true,
    },

    gia: {
      type: Number,
      required: true,
      min: 0,
    },

    //  Giá sau khi giảm
    giaGiam: {
      type: Number,
      default: 0,
      min: 0,
    },

    moTa: {
      type: String,
      trim: true,
    },

    anhMinhHoa: {
      type: String,
      trim: true,
    },

    //  Điểm đánh giá trung bình (1–5)
    soSaoTrungBinh: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    //  Tổng số lượt đánh giá
    luotDanhGia: {
      type: Number,
      default: 0,
      min: 0,
    },

    //  Tổng số lượt bán
    luotBan: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

const Qualuuniem = mongoose.model("Qualuuniem", qualuuniemSchema);

module.exports = Qualuuniem;
