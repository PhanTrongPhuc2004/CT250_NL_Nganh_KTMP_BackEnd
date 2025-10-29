const Ve = require('../models/Ve.model');

const createVe = async (data) => {
    const ve = new Ve(data);
    return await ve.save();
};

const getAllVe = async () => {
    return await Ve.find().populate('maTranDau', 'maTranDau diaDiem ngayBatDau').populate('maNguoiDung', 'hoVaTen');
};

const getVeById = async (id) => {
    return await Ve.findById(id);
};

const getVeByUser = async (userId) => {
    return await Ve.find({ maNguoiDung: userId });
};

const updateVe = async (id, data) => {
    return await Ve.findByIdAndUpdate(id, data, { new: true });
};

const deleteVe = async (id) => {
    return await Ve.findByIdAndDelete(id);
};

module.exports = { createVe, getAllVe, getVeById, getVeByUser, updateVe, deleteVe };