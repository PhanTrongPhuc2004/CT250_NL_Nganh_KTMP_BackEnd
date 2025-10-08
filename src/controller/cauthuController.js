const cauthuService = require("../services/cauthuService");

// GET /api/cauthus
exports.getAllCauthus = async (req, res) => {
  try {
    const cauthus = await cauthuService.getAllCauthus();
    res.json(cauthus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/cauthus/:id
exports.getCauthuById = async (req, res) => {
  try {
    const cauthu = await cauthuService.getCauthuById(req.params.id);
    if (!cauthu) return res.status(404).json({ message: "Cầu thủ không tồn tại" });
    res.json(cauthu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/cauthus
exports.createCauthu = async (req, res) => {
  try {
    const created = await cauthuService.createCauthu(req.body);
    res.status(201).json({ message: "Đã tạo cầu thủ mới", cauthu: created });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT /api/cauthus/:id
exports.updateCauthu = async (req, res) => {
  try {
    const updated = await cauthuService.updateCauthu(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Không tìm thấy cầu thủ để cập nhật" });
    res.json({ message: "Đã cập nhật cầu thủ", cauthu: updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /api/cauthus/:id
exports.deleteCauthu = async (req, res) => {
  try {
    const deleted = await cauthuService.deleteCauthu(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Không tìm thấy cầu thủ để xóa" });
    res.json({ message: "Đã xóa cầu thủ thành công" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/cauthus/search?keyword=...
exports.searchCauthus = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const results = await cauthuService.searchCauthus(keyword);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/cauthus/filter/position?position=...
exports.filterByPosition = async (req, res) => {
  try {
    const { position } = req.query;
    const results = await cauthuService.filterByPosition(position);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/cauthus/filter/nationality?nationality=...
exports.filterByNationality = async (req, res) => {
  try {
    const { nationality } = req.query;
    const results = await cauthuService.filterByNationality(nationality);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
