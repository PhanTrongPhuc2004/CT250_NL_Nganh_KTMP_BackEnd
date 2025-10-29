const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GiaiDauSchema = new Schema({
  tenGiaiDau: {
    type: String,
    required: true,
  },
  moTa: {
    type: String,
    required: false,
  },
  muaGiaiId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MuaGiai',
    required: true,
  },
});

module.exports = mongoose.model('GiaiDau', GiaiDauSchema);
