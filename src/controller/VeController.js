const veService = require('../services/veService');
const QRCode = require('qrcode');  // Thư viện generate QR
const TranDau = require('../models/TranDau.model');  // Giả định model TranDau tồn tại (vì có tranDauRouter)

class VeController {
  // [POST] /ve/mua - Mua vé (chức năng chính UC_22)
  async muaVe(req, res) {
    try {
      const { maTranDau, soLuong } = req.body;
      const user = req.user;  // Từ authMiddleware

      if (user.vaiTro !== 'nguoihammo') {
        return res.status(403).json({ message: 'Chỉ người hâm mộ mới mua vé được' });
      }

      // Kiểm tra trận đấu tồn tại và vé còn (giả định TranDau có field soVeConLai)
      const tranDau = await TranDau.findOne({ maTranDau });  // Sử dụng maTranDau như trong model NguoiDung
      if (!tranDau) {
        return res.status(404).json({ message: 'Trận đấu không tồn tại' });
      }
      if (tranDau.soVeConLai < soLuong) {
        return res.status(400).json({ message: 'Vé đã hết hoặc không đủ số lượng' });
      }

      // Tính giá (giả định giaVe từ TranDau)
      const gia = tranDau.giaVe * soLuong;

      // Placeholder cho thanh toán (tích hợp VNPay/Momo thực tế, tương tự các service khác)
      // const paymentResult = await integratePayment(gia, user.email);
      // if (!paymentResult.success) {
      //   return res.status(402).json({ message: 'Thanh toán thất bại' });
      // }

      // Tạo vé mới
      const veData = {
        maTranDau: tranDau._id,  // Sử dụng _id từ MongoDB
        maNguoiDung: user._id,
        soLuong,
        gia,
        status: 'reserved',  // Ban đầu reserved, sau thanh toán thành paid
      };
      const newVe = await veService.createVe(veData);

      // Generate QR code (data là maVe + maTranDau)
      const qrData = `VE-${newVe.maVe}-TRAN-${maTranDau}`;
      const qrCode = await QRCode.toDataURL(qrData);

      // Update vé với QR và status paid
      const updatedVe = await veService.updateVe(newVe._id, { qrCode, status: 'paid' });

      // Update số vé còn lại ở TranDau
      await TranDau.findByIdAndUpdate(tranDau._id, { $inc: { soVeConLai: -soLuong } });

      // Gửi email xác nhận (placeholder, tương tự gửi OTP trong NguoiDung nếu có)
      // sendEmail(user.email, 'Xác nhận vé', `QR Code: ${qrCode}`);

      res.status(200).json({ message: 'Mua vé thành công', data: updatedVe });
    } catch (error) {
      console.error('Error mua ve:', error);
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