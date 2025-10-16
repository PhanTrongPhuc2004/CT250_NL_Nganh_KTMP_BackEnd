const NguoiDung = require('./NguoiDung.model');
const mongoose = require('mongoose');
const generateCode = require('../utils/generateCode');
const Schema = mongoose.Schema;

const NguoiHamMo = new Schema({
  maNguoiDung: {
    type: String,
    required: true,
    unique: true,
    default: () => generateCode('fan'),
  },
});
module.exports = NguoiDung.discriminator('NguoiHamMo', NguoiHamMo);
