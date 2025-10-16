const { default: mongoose } = require('mongoose');

const Schema = require('mongoose').Schema;

const DoiHinhSchema = new Schema({
  doiHinh: {
    type: String,
    required: true,
  },
  cauLacBoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CauLacBo', // tham chiếu tới collection Lineup
    required: true, // nếu cầu thủ nào cũng phải thuộc 1 đội hình
  },
});

module.exports = mongoose.models.DoiHinh || mongoose.model('DoiHinh', DoiHinhSchema);
