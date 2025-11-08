const cauthuService = require('../services/cauthuService');

// GET /api/cauthus
exports.getAllCauthus = async (req, res) => {
  const maDoiHinh = req.query.maDoiHinh;
  console.log(maDoiHinh);
  try {
    if (maDoiHinh) {
      const cauthus = await cauthuService.getCauThuByMaDoiHinh(maDoiHinh);
      res.json(cauthus);
    } else {
      const cauthus = await cauthuService.getAllCauthus();
      res.json(cauthus);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/cauthus/:id
exports.getCauthuById = async (req, res) => {
  try {
    const cauthu = await cauthuService.getCauthuById(req.params.id);
    if (!cauthu) return res.status(404).json({ message: 'Cầu thủ không tồn tại' });
    res.json(cauthu);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/cauthus
exports.createCauthu = async (req, res) => {
  try {
    const created = await cauthuService.createCauthu(req.body);
    res.status(201).json({ message: 'Đã tạo cầu thủ mới', cauthu: created });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT /api/cauthus/:id
exports.updateCauthu = async (req, res) => {
  try {
    const updated = await cauthuService.updateCauthu(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Không tìm thấy cầu thủ để cập nhật' });
    res.json({ message: 'Đã cập nhật cầu thủ', cauthu: updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /api/cauthus/:id
exports.deleteCauthu = async (req, res) => {
  try {
    const deleted = await cauthuService.deleteCauthu(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Không tìm thấy cầu thủ để xóa' });
    res.json({ message: 'Đã xóa cầu thủ thành công' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/cauthus/search?keyword=...
exports.searchCauthus = async (req, res) => {
  try {
    const keyword = req.query.keyword || '';
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

exports.updateDoiHinh = async (req, res) => {
  console.log('cap nhat doi hinh cho cau thu', req.body);
  try {
    const cauThuId = req.params.id;
    const cauthuUpdate = await cauthuService.updateDoiHinh(cauThuId, req.body);
    if (!cauthuUpdate) {
      console.log('cap nhat khong thanh cong');
    }
    res.json(cauthuUpdate);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteDoiHinh = async (req, res) => {
  try {
    const cauThuId = req.params.cauthuId;
    const doiHinhId = req.params.doiHinhId;
    const cauthuUpdate = await cauthuService.deleteDoiHinh(cauThuId, doiHinhId);
    res.json(cauthuUpdate);
  } catch (error) {
    console.log(error);
  }
};
