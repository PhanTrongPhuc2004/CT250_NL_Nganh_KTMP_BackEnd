const Ve = require('../models/Ve.model');

// Create a new Ve
const createVe = async (veData) => {
    try {
        const newVe = new Ve(veData);
        await newVe.save();
        return newVe;
    } catch (error) {
        throw new Error('Error creating Ve: ' + error.message);
    }
};

// Get all Ve
const getAllVe = async () => {
    try {
        const veList = await Ve.find().populate('maTranDau maNguoiDung');
        return veList;
    } catch (error) {
        throw new Error('Error fetching Ve: ' + error.message);
    }
};

// Get Ve by ID
const getVeById = async (id) => {
    try {
        const ve = await Ve.findById(id).populate('maTranDau maNguoiDung');
        if (!ve) {
            throw new Error('Ve not found');
        }
        return ve;
    } catch (error) {
        throw new Error('Error fetching Ve by ID: ' + error.message);
    }
};

// Update Ve by ID (ví dụ: update status sau thanh toán)
const updateVe = async (id, veData) => {
    try {
        const updatedVe = await Ve.findByIdAndUpdate(id, veData, { new: true });
        if (!updatedVe) {
            throw new Error('Ve not found');
        }
        return updatedVe;
    } catch (error) {
        throw new Error('Error updating Ve: ' + error.message);
    }
};

// Delete Ve by ID
const deleteVe = async (id) => {
    try {
        const deletedVe = await Ve.findByIdAndDelete(id);
        if (!deletedVe) {
            throw new Error('Ve not found');
        }
        return deletedVe;
    } catch (error) {
        throw new Error('Error deleting Ve: ' + error.message);
    }
};

// Get Ve by User ID (vé của người hâm mộ)
const getVeByUser = async (userId) => {
    try {
        const veList = await Ve.find({ maNguoiDung: userId }).populate('maTranDau');
        return veList;
    } catch (error) {
        throw new Error('Error fetching Ve by User: ' + error.message);
    }
};

module.exports = {
    createVe,
    getAllVe,
    getVeById,
    updateVe,
    deleteVe,
    getVeByUser,
};