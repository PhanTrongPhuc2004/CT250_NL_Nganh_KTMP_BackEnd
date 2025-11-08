const HopDong = require("../models/HopDong");

const HopDongService = {
  async getAll() {
    return await HopDong.find().sort({ createdAt: -1 });
  },

  async getById(id) {
    return await HopDong.findById(id);
  },

  async create(data) {
    // Kiểm tra trùng mã hợp đồng
    const existed = await HopDong.findOne({ maHopDong: data.maHopDong });
    if (existed) throw new Error("Mã hợp đồng đã tồn tại!");
    
    const hopDong = new HopDong(data);
    return await hopDong.save();
  },

  async update(id, data) {
    const hopDong = await HopDong.findByIdAndUpdate(id, data, { new: true });
    if (!hopDong) throw new Error("Không tìm thấy hợp đồng!");
    return hopDong;
  },

  async delete(id) {
    const hopDong = await HopDong.findByIdAndDelete(id);
    if (!hopDong) throw new Error("Không tìm thấy hợp đồng để xóa!");
    return hopDong;
  },

  async getByStatus(trangThai) {
    return await HopDong.find({ trangThai });
  },
};

module.exports = HopDongService;
