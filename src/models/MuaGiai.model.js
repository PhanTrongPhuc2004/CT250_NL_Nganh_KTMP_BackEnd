const mongoose = require('mongoose');
const generateCode = require('../utils/generateCode');
const Schema = mongoose.Schema;
const MuaGiaiSchema = new Schema({
  namBatDau: {
    type: Number,
    required: true,
  },
  namKetThuc: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('MuaGiai', MuaGiaiSchema);
