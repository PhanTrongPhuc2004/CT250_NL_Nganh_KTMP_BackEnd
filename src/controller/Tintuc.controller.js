const TintucService = require('../services/Tintuc.service');

exports.getAllTintuc = async (req, res) => {
  try {
    const list = await TintucService.getAll();
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getTintucById = async (req, res) => {
  try {
    const tintuc = await TintucService.getById(req.params.id);
    if (!tintuc) return res.status(404).json({ message: 'Tin tức không tồn tại' });
    res.json(tintuc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createTintuc = async (req, res) => {
  try {
    const newTintuc = await TintucService.create(req.body);
    res.status(201).json(newTintuc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateTintuc = async (req, res) => {
  try {
    const updatedTintuc = await TintucService.update(req.params.id, req.body);
    if (!updatedTintuc) return res.status(404).json({ message: 'Tin tức không tồn tại' });
    res.json(updatedTintuc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteTintuc = async (req, res) => {
  try {
    const deletedTintuc = await TintucService.delete(req.params.id);
    if (!deletedTintuc) return res.status(404).json({ message: 'Tin tức không tồn tại' });
    res.json({ message: 'Đã xóa tin tức thành công' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
