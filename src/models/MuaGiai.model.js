// src/models/MuaGiai.model.js
const mongoose = require('mongoose');
const generateCode = require('../utils/generateCode');

const MuaGiaiSchema = new mongoose.Schema(
  {
    maMuaGiai: {
      type: String,
      required: true,
      unique: true,
      default: () => generateCode('MG'),
    },
    tenMuaGiai: {
      type: String,
      required: true,
      trim: true,
    },
    maGiaiDau: {
      type: String,
      ref: 'GiaiDau',
      required: true,
    },
    ngayBatDau: {
      type: Date,
      required: true,
    },
    ngayKetThuc: {
      type: Date,
      required: true,
    },
    anhMinhHoa: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

MuaGiaiSchema.pre('save', function (next) {
  if (!this.maMuaGiai) this.maMuaGiai = generateCode('MG');
  next();
});

module.exports = mongoose.model('MuaGiai', MuaGiaiSchema);
