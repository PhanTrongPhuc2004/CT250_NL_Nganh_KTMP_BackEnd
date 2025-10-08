const hopDongService = require("../services/hopdongService");

/**
 * POST /api/hopdong
 * Tạo hợp đồng mới
 */
exports.createHopDong = async (req, res) => {
  try {
    const created = await hopDongService.createHopDong(req.body);
    res.status(201).json({ message: "Thêm hợp đồng thành công", data: created });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi thêm hợp đồng", error: error.message });
  }
};

/**
 * GET /api/hopdong
 * Lấy danh sách hợp đồng
 */
exports.getAllHopDong = async (req, res) => {
  try {
    const list = await hopDongService.getAllHopDong();
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách hợp đồng", error: error.message });
  }
};

/**
 * GET /api/hopdong/:id
 * Lấy chi tiết hợp đồng theo ID
 */
exports.getHopDongById = async (req, res) => {
  try {
    const hopdong = await hopDongService.getHopDongById(req.params.id);
    if (!hopdong) return res.status(404).json({ message: "Không tìm thấy hợp đồng" });
    res.status(200).json(hopdong);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy thông tin hợp đồng", error: error.message });
  }
};

/**
 * PUT /api/hopdong/:id
 * Cập nhật hợp đồng
 */
exports.updateHopDong = async (req, res) => {
  try {
    const updated = await hopDongService.updateHopDong(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Không tìm thấy hợp đồng để cập nhật" });
    res.status(200).json({ message: "Cập nhật hợp đồng thành công", data: updated });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật hợp đồng", error: error.message });
  }
};

/**
 * DELETE /api/hopdong/:id
 * Xóa hợp đồng
 */
exports.deleteHopDong = async (req, res) => {
  try {
    const deleted = await hopDongService.deleteHopDong(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Không tìm thấy hợp đồng để xóa" });
    res.status(200).json({ message: "Xóa hợp đồng thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa hợp đồng", error: error.message });
  }
};
