const TranDau = require('../models/TranDau.model');

// Create
async function createTranDau(data) {
  const tranDau = new TranDau(data);
  return await tranDau.save();
}

// Read all
async function getAllTranDaus() {
  return await TranDau.find();
}

// Read by id
async function getTranDauById(id) {
  return await TranDau.findById(id);
}

// Update
async function updateTranDau(id, data) {
  return await TranDau.findByIdAndUpdate(id, data, { new: true });
}

// Delete
async function deleteTranDau(id) {
  return await TranDau.findByIdAndDelete(id);
}

module.exports = {
  createTranDau,
  getAllTranDaus,
  getTranDauById,
  updateTranDau,
  deleteTranDau,
};
