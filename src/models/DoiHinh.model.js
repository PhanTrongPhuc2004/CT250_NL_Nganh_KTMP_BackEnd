const { default: mongoose } = require('mongoose');
const generateCode = require('../utils/generateCode');
const Schema = require('mongoose').Schema;

const DoiHinhSchema = new Schema({
  tenDoiHinh: {
    type: String,
    required: true,
  },

  maDoiHinh: {
    type: String,
    required: false,
    unique: true,
    default: () => generateCode('DH'),
  },
  maDoiBong: {
    type: String,
    ref: 'DoiBong',
    required: true,
  },
});

module.exports = mongoose.models.DoiHinh || mongoose.model('DoiHinh', DoiHinhSchema);
