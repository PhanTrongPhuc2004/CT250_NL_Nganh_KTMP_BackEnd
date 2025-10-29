const GiaiDau = require('../models/GiaiDau.model');

const createGiaiDau = async (data) => {
    const giaiDau = new GiaiDau(data);
    return await giaiDau.save();
};

const getAllGiaiDau = async () => {
    return await GiaiDau.find();
};

const getGiaiDauByMa = async (maGiaiDau) => {
    return await GiaiDau.findOne({ maGiaiDau });
};

const updateGiaiDau = async (maGiaiDau, data) => {
    return await GiaiDau.findOneAndUpdate({ maGiaiDau }, data, { new: true });
};

const deleteGiaiDau = async (maGiaiDau) => {
    return await GiaiDau.findOneAndDelete({ maGiaiDau });
};

module.exports = {
    createGiaiDau,
    getAllGiaiDau,
    getGiaiDauByMa,
    updateGiaiDau,
    deleteGiaiDau,
};