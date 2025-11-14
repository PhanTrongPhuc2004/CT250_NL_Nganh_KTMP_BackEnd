const mongoose = require('mongoose');
const generateCode = require('../utils/generateCode'); // Nếu bạn đã có file generateCode.js

const TintucSchema = new mongoose.Schema(
  {
    maTinTuc: {
      type: String,
      unique: true,
      default: () => generateCode('TT'),
    },
    title: { type: String, required: true, trim: true },
    desc: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String, required: true },
    source: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Tintuc', TintucSchema);
