// src/models/DoiBong.model.js
const mongoose = require('mongoose');

const DoiBongSchema = new mongoose.Schema({
    maDoiBong: {
        type: String,
        required: true,
        unique: true,
    },
    tenDoiBong: {
        type: String,
        required: true,
        trim: true,
    },
    sanNha: {
        type: String,
        required: true,
        trim: true,
    },
    logoUrl: {
        type: String,
        trim: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('DoiBong', DoiBongSchema);