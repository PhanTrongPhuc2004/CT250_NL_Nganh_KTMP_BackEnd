const mongoose = require('mongoose');
const generateCode = require('../utils/generateCode');

const GiaiDauSchema = new mongoose.Schema({
    maGiaiDau: {
        type: String,
        required: true,
        unique: true,
        default: () => generateCode('GD'),
    },
    tenGiaiDau: {
        type: String,
        required: true,
        trim: true,
    },
    namToChuc: {
        type: Number,
        required: true,
    },
    moTa: {
        type: String,
        trim: true,
    },
}, { timestamps: true });

GiaiDauSchema.pre('save', function (next) {
    if (!this.maGiaiDau) this.maGiaiDau = generateCode('GD');
    next();
});

module.exports = mongoose.model('GiaiDau', GiaiDauSchema);