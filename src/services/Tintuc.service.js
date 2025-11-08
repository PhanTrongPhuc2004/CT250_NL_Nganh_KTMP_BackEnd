const Tintuc = require('../models/Tintuc.model');

class TintucService {
  async getAll() {
    return await Tintuc.find().sort({ createdAt: -1 });
  }

  async getById(id) {
    return await Tintuc.findById(id);
  }

  async create(data) {
    const tintuc = new Tintuc(data);
    return await tintuc.save();
  }

  async update(id, data) {
    return await Tintuc.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Tintuc.findByIdAndDelete(id);
  }
}

module.exports = new TintucService();
