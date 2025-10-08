const quaLuuNiemService = require("../services/qualuuniemService");

/**
 * POST /api/qualuuniem
 */
exports.createQuaLuuNiem = async (req, res) => {
  try {
    const created = await quaLuuNiemService.createQuaLuuNiem(req.body);
    res.status(201).json({ message: "Thêm quà lưu niệm thành công", data: created });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi thêm quà lưu niệm", error: error.message });
  }
};

/**
 * GET /api/qualuuniem
 */
exports.getAllQuaLuuNiem = async (req, res) => {
  try {
    const list = await quaLuuNiemService.getAllQuaLuuNiem();
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách quà lưu niệm", error: error.message });
  }
};

/**
 * GET /api/qualuuniem/:id
 */
exports.getQuaLuuNiemById = async (req, res) => {
  try {
    const item = await quaLuuNiemService.getQuaLuuNiemById(req.params.id);
    if (!item) return res.status(404).json({ message: "Không tìm thấy quà lưu niệm" });
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy thông tin quà lưu niệm", error: error.message });
  }
};

/**
 * PUT /api/qualuuniem/:id
 */
exports.updateQuaLuuNiem = async (req, res) => {
  try {
    const updated = await quaLuuNiemService.updateQuaLuuNiem(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Không tìm thấy quà lưu niệm để cập nhật" });
    res.status(200).json({ message: "Cập nhật thành công", data: updated });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật quà lưu niệm", error: error.message });
  }
};

/**
 * DELETE /api/qualuuniem/:id
 */
exports.deleteQuaLuuNiem = async (req, res) => {
  try {
    const deleted = await quaLuuNiemService.deleteQuaLuuNiem(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Không tìm thấy quà lưu niệm để xóa" });
    res.status(200).json({ message: "Xóa quà lưu niệm thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa quà lưu niệm", error: error.message });
  }
};
