// src/controller/VeController.js
const veService = require('../services/veService');
const TranDau = require('../services/tranDauService');
const QRCode = require('qrcode');

class VeController {
  async muaVe(req, res) {
    try {
      const { maTranDau, loaiVe, khuVuc, hangGhe } = req.body;
      const user = req.user;

      if (user.vaiTro !== 'nguoihammo') {
        return res.status(403).json({ message: 'Chỉ người hâm mộ mới mua vé được' });
      }

      const veData = { maTranDau, loaiVe, khuVuc, hangGhe };

      // GỌI SERVICE MỚI
      const newVe = await veService.muaVe(veData, user._id);

      // TẠO QR
      const qrCode = await QRCode.toDataURL(`VE-${newVe.maVe}`);
      const updatedVe = await veService.updateVeById(newVe._id, { qrCode });

      res.json({ message: 'Mua vé thành công', data: updatedVe });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllVe(req, res) {
    const list = await veService.getAllVe();
    res.json(list);
  }

  async getVeByUser(req, res) {
    try {
      const list = await veService.getVeByUser(req.user._id);
      if (!list || list.length === 0) return res.status(404).json({ message: 'Không có vé' });
      res.json(list);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async getVeByMa(req, res) {
    const ve = await veService.getVeByMa(req.params.maVe);
    if (!ve) return res.status(404).json({ message: 'Không tìm thấy' });
    res.json(ve);
  }

  async getVeById(req, res) {
    const ve = await veService.getVeById(req.params.id);
    if (!ve) return res.status(404).json({ message: 'Không tìm thấy' });
    res.json(ve);
  }

  async getVeByMaTranDau(req, res) {
    const list = await veService.getVeByMaTranDau(req.params.maTranDau);
    res.json(list);
  }

  async updateVeByMa(req, res) {
    const updated = await veService.updateVeByMa(req.params.maVe, req.body);
    if (!updated) return res.status(404).json({ message: 'Không tìm thấy' });
    res.json({ message: 'Cập nhật thành công', data: updated });
  }

  async updateVeById(req, res) {
    const updated = await veService.updateVeById(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Không tìm thấy' });
    res.json({ message: 'Cập nhật thành công', data: updated });
  }

  async deleteVeByMa(req, res) {
    const deleted = await veService.deleteVeByMa(req.params.maVe);
    if (!deleted) return res.status(404).json({ message: 'Không tìm thấy' });
    res.json({ message: 'Xóa thành công' });
  }

  async deleteVeById(req, res) {
    const deleted = await veService.deleteVeById(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Không tìm thấy' });
    res.json({ message: 'Xóa thành công' });
  }
}

module.exports = new VeController();