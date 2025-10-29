const veService = require('../services/veService');
const QRCode = require('qrcode');  // Thư viện generate QR
const TranDau = require('../models/TranDau.model');  // Giả định model TranDau tồn tại (vì có tranDauRouter)

class VeController {
  // [POST] /ve/mua - Mua vé (chức năng chính UC_22)
  async muaVe(req, res) {
    try {
      const { maTranDau, soLuong } = req.body;
      const user = req.user;

      if (user.vaiTro !== 'nguoihammo') {
        return res.status(403).json({ message: 'Chỉ người hâm mộ mới mua vé được' });
      }

      const tranDau = await TranDau.findOne({ maTranDau });
      if (!tranDau || tranDau.soVeConLai < soLuong) {
        return res.status(400).json({ message: 'Vé đã hết hoặc không đủ' });
      }

      const gia = tranDau.giaVe * soLuong;
      const veData = { maTranDau, maNguoiDung: user._id, soLuong, gia, status: 'reserved' };
      const newVe = await veService.createVe(veData);

      const qrCode = await QRCode.toDataURL(`VE-${newVe.maVe}`);
      const updatedVe = await veService.updateVe(newVe._id, { qrCode, status: 'paid' });

      await TranDau.updateOne({ maTranDau }, { $inc: { soVeConLai: -soLuong } });

      res.json({ message: 'Mua vé thành công', data: updatedVe });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server', error });
    }
  }

  // [GET] /ve - Lấy tất cả vé (cho admin, kiểm tra vaiTro nếu cần)
  async getAllVe(req, res) {
    try {
      const veList = await veService.getAllVe();
      res.status(200).json(veList);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server', error });
    }
  }

  // [GET] /ve/:id - Lấy vé theo ID
  async getVeById(req, res) {
    try {
      const ve = await veService.getVeById(req.params.id);
      res.status(200).json(ve);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server', error });
    }
  }

  // [GET] /ve/user - Lấy vé của user hiện tại
  async getVeByUser(req, res) {
    try {
      const user = req.user;
      const veList = await veService.getVeByUser(user._id);
      res.status(200).json(veList);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server', error });
    }
  }

  // [PUT] /ve/:id - Update vé (ví dụ: quét QR để used)
  async updateVe(req, res) {
    try {
      const updatedVe = await veService.updateVe(req.params.id, req.body);
      res.status(200).json({ message: 'Cập nhật vé thành công', data: updatedVe });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server', error });
    }
  }

  // [DELETE] /ve/:id - Xóa vé (cho admin)
  async deleteVe(req, res) {
    try {
      const deletedVe = await veService.deleteVe(req.params.id);
      res.status(200).json({ message: 'Xóa vé thành công', data: deletedVe });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server', error });
    }
  }
}

module.exports = new VeController();