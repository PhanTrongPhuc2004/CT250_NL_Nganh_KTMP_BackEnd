const lichTrinhService = require("../services/lichtrinhService");
/**
 * POST /api/lichtrinh
 * Tạo lịch trình mới
 */
exports.createLichTrinh = async (req, res) => {
  try {
    const created = await lichTrinhService.createLichTrinh(req.body);
    res.status(201).json({ message: "Thêm lịch trình thành công", data: created });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi thêm lịch trình", error: error.message });
  }
};

/**
 * GET /api/lichtrinh
 * Lấy danh sách lịch trình
 */
exports.getAllLichTrinh = async (req, res) => {
  try {
    const list = await lichTrinhService.getAllLichTrinh();
    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách lịch trình", error: error.message });
  }
};

/**
 * GET /api/lichtrinh/:id
 * Lấy chi tiết lịch trình theo ID
 */
exports.getLichTrinhById = async (req, res) => {
  try {
    const lichtrinh = await lichTrinhService.getLichTrinhById(req.params.id);
    if (!lichtrinh) return res.status(404).json({ message: "Không tìm thấy lịch trình" });
    res.status(200).json(lichtrinh);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy thông tin lịch trình", error: error.message });
  }
};

/**
 * PUT /api/lichtrinh/:id
 * Cập nhật lịch trình
 */
exports.updateLichTrinh = async (req, res) => {
  try {
    const updated = await lichTrinhService.updateLichTrinh(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Không tìm thấy lịch trình để cập nhật" });
    res.status(200).json({ message: "Cập nhật lịch trình thành công", data: updated });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật lịch trình", error: error.message });
  }
};

/**
 * DELETE /api/lichtrinh/:id
 * Xóa lịch trình
 */
exports.deleteLichTrinh = async (req, res) => {
  try {
    const deleted = await lichTrinhService.deleteLichTrinh(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Không tìm thấy lịch trình để xóa" });
    res.status(200).json({ message: "Xóa lịch trình thành công" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa lịch trình", error: error.message });
  }
};
