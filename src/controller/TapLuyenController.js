// src/controller/LichTapLuyenController.js
const lichTapService = require('../services/tapLuyenService');
const TranDau = require('../models/TranDau.model');
const NguoiDung = require('../models/NguoiDung.model');
const CauThu = require('../models/cauthu');
const { formatDate } = require('../utils/function/formatFunction');

class LichTapLuyenController {
  async createLichTap(req, res) {
    console.log('tao lich tap', req.body);
    const data = req.body;
    const io = req.app.get('io');

    try {
      // Tạo lịch tập trước
      const lich = await lichTapService.createLichTap(data);

      // Lấy thông tin lịch tập vừa tạo
      const lichTap = await lichTapService.getLichTapById(lich._id);
      const tranDau = await TranDau.findOne({ maTranDau: data.maTranDau });

      // Tìm các cầu thủ trong đội hình
      const cauThus = await CauThu.find({ maDoiHinh: tranDau.maDoiHinh });

      console.log(`📢 Tìm thấy ${cauThus.length} cầu thủ trong đội hình ${data.maDoiHinh}`);

      // ✅ KIỂM TRA: In ra danh sách cầu thủ
      console.log(
        '👥 Danh sách cầu thủ:',
        cauThus.map((c) => ({
          maNguoiDung: c.maNguoiDung,
          tenDangNhap: c.tenDangNhap,
        }))
      );

      /* Gửi thông báo về cho cầu thủ */
      cauThus.forEach((cauThu) => {
        const roomName = `user_${cauThu.maNguoiDung}`;

        // ✅ DEBUG: Kiểm tra room có tồn tại không
        const room = io.sockets.adapter.rooms.get(roomName);
        console.log(`🎯 Room ${roomName}: ${room ? `CÓ ${room.size} người` : 'KHÔNG có ai'}`);

        // SỬA: Thông báo về lịch tập thay vì trận đấu
        io.to(roomName).emit('notification', {
          title: '📅 Bạn có lịch tập mới!',
          message: `Bạn có buổi tập vào lúc ${lichTap.thoiGian} ngày ${formatDate(lichTap.ngayBatDau)} tại ${lichTap.diaDiem || 'sân tập'}`,
          maLichTap: lichTap.maLichTap || lichTap._id,
          maDoiHinh: data.maDoiHinh,
          loai: 'lich_tap', // Thêm loại để phân biệt
          timestamp: new Date().toISOString(),
          type: 'system',
        });

        console.log(`📤 Đã gửi thông báo lịch tập đến ${roomName}`);
      });

      res.status(201).json({
        message: 'Tạo lịch tập thành công',
        data: lich,
        thongBao: `Đã gửi thông báo đến ${cauThus.length} cầu thủ`,
      });
    } catch (error) {
      console.error('❌ Lỗi khi tạo lịch tập:', error);
      res.status(400).json({ message: error.message });
    }
  }

  async getAllLichTap(req, res) {
    try {
      const list = await lichTapService.getAllLichTap();
      res.json(list);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async getLichTapByMa(req, res) {
    try {
      const { maLichTapLuyen } = req.params;
      const lich = await lichTapService.getLichTapByMa(maLichTapLuyen);
      if (!lich) return res.status(404).json({ message: 'Không tìm thấy' });
      res.json(lich);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async getLichTapById(req, res) {
    try {
      const { id } = req.params;
      const lich = await lichTapService.getLichTapById(id);
      if (!lich) return res.status(404).json({ message: 'Không tìm thấy' });
      res.json(lich);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async updateLichTapByMa(req, res) {
    try {
      const { maLichTapLuyen } = req.params;
      const data = req.body;
      const updated = await lichTapService.updateLichTapByMa(maLichTapLuyen, data);
      if (!updated) return res.status(404).json({ message: 'Không tìm thấy' });
      res.json({ message: 'Cập nhật thành công', data: updated });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async updateLichTapById(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updated = await lichTapService.updateLichTapById(id, data);
      if (!updated) return res.status(404).json({ message: 'Không tìm thấy' });
      res.json({ message: 'Cập nhật thành công', data: updated });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async deleteLichTapByMa(req, res) {
    try {
      const { maLichTapLuyen } = req.params;
      const deleted = await lichTapService.deleteLichTapByMa(maLichTapLuyen);
      if (!deleted) return res.status(404).json({ message: 'Không tìm thấy' });
      res.json({ message: 'Xóa thành công' });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async deleteLichTapById(req, res) {
    try {
      const { id } = req.params;
      const deleted = await lichTapService.deleteLichTapById(id);
      if (!deleted) return res.status(404).json({ message: 'Không tìm thấy' });
      res.json({ message: 'Xóa thành công' });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }
}

module.exports = new LichTapLuyenController();
