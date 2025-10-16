const mongoose = require('mongoose');
const generateCode = require('../utils/generateCode');
const { Schema } = mongoose;
const NguoiDung = require('./NguoiDung.model');
const AdminSchema = new Schema({
  maNguoiDung: {
    type: String,
    required: true,
    unique: true,
    default: () => generateCode('Admin'),
  },
});

module.exports = NguoiDung.discriminator('Admin', AdminSchema);
