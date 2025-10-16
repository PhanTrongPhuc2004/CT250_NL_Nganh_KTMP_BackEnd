const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CauThu = require('./cauthu');

const KetQuaTranDau = new Schema({
  tiSo: {
    type: Array,
  },

  tiLeKiemSoatBong: {
    type: Array,
    required: true,
  },

  soTheVang: {
    type: Number,
    required: true,
  },
  soTheDo: {
    type: Number,
    required: true,
  },
  tranDauId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TranDau',
    required: true,
  },
});

module.exports = mongoose.Schema.KetQuaTranDau || mongoose.model('KetQuaTranDau', KetQuaTranDau);
