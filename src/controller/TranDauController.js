// src/controller/TranDauController.js
const tranDauService = require('../services/tranDauService');
const TranDau = require('../models/TranDau.model');
const LichTapLuyen = require('../models/TapLuyen.model');
const NguoiDung = require('../models/NguoiDung.model');
const DoiHinhController = require('./DoiHinhController');
const DoiHinh = require('../models/DoiHinh.model');
class TranDauController {
  async createTranDau(req, res) {
    console.log('📥 Tao tran dau:', req.body);
    try {
      const data = req.body;
      const tranDau = await tranDauService.createTranDau(data);
      const io = req.app.get('io');
      const cauThus = await NguoiDung.find({ maDoiHinh: data.maDoiHinh });

      console.log(`📢 Tìm thấy ${cauThus.length} cầu thủ trong đội hình ${data.maDoiHinh}`);

      // ✅ KIỂM TRA: In ra danh sách cầu thủ
      console.log(
        '👥 Danh sách cầu thủ:',
        cauThus.map((c) => ({
          maNguoiDung: c.maNguoiDung,
          tenDangNhap: c.tenDangNhap,
        }))
      );

      /*Gui thong bao ve cho cau thu */
      cauThus.forEach((cauThu) => {
        const roomName = `user_${cauThu.maNguoiDung}`;

        // ✅ DEBUG: Kiểm tra room có tồn tại không
        const room = io.sockets.adapter.rooms.get(roomName);
        console.log(`🎯 Room ${roomName}: ${room ? `CÓ ${room.size} người` : 'KHÔNG có ai'}`);

        io.to(roomName).emit('notification', {
          title: 'Bạn có trận đấu mới!',
          message: `Bạn đã được thêm vào trận đấu ${tranDau.doiNha} vs ${tranDau.doiKhach}, diễn ra ngày ${tranDau.ngayBatDau} vào lúc ${tranDau.thoiGian}`,
          maTranDau: tranDau.maTranDau,
          maDoiHinh: data.maDoiHinh,
          timestamp: new Date().toISOString(),
        });

        console.log(`📤 Đã emit đến ${roomName}`);
      });

      console.log('✅ Đã gửi thông báo đến tất cả cầu thủ');

      res.status(201).json({
        message: 'Tạo trận đấu thành công',
        data: tranDau,
        notifiedPlayers: cauThus.length,
      });
    } catch (error) {
      console.error('❌ Lỗi tạo trận đấu:', error);
      res.status(400).json({ message: error.message });
    }
  }

  async getAllTranDau(req, res) {
    try {
      const list = await tranDauService.getAllTranDau();
      res.json(list);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Lỗi server' });
    }
  }
  async getAllTranDau(req, res) {
    const { maDoiHinh } = req.query;
    const query = maDoiHinh ? { $or: [{ doiNha: maDoiHinh }, { doiKhach: maDoiHinh }] } : {};
    const list = await TranDau.find(query).sort({ ngayBatDau: 1 });
    res.json(list);
  }

  async getTranDauByMa(req, res) {
    try {
      const { maTranDau } = req.params;
      const tranDau = await tranDauService.getTranDauByMa(maTranDau);
      if (!tranDau) return res.status(404).json({ message: 'Không tìm thấy' });
      res.json(tranDau);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async getTranDauById(req, res) {
    try {
      const { id } = req.params;
      const tranDau = await tranDauService.getTranDauById(id);
      if (!tranDau) return res.status(404).json({ message: 'Không tìm thấy' });
      res.json(tranDau);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async updateTranDauByMa(req, res) {
    try {
      const { maTranDau } = req.params;
      const data = req.body;
      const updated = await tranDauService.updateTranDauByMa(maTranDau, data);
      if (!updated) return res.status(404).json({ message: 'Không tìm thấy' });
      res.json({ message: 'Cập nhật thành công', data: updated });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async updateTranDauById(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updated = await tranDauService.updateTranDauById(id, data);
      if (!updated) return res.status(404).json({ message: 'Không tìm thấy' });
      res.json({ message: 'Cập nhật thành công', data: updated });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async deleteTranDauByMa(req, res) {
    try {
      const { maTranDau } = req.params;
      const deleted = await tranDauService.deleteTranDauByMa(maTranDau);
      if (!deleted) return res.status(404).json({ message: 'Không tìm thấy' });
      res.json({ message: 'Xóa thành công' });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async deleteTranDauById(req, res) {
    try {
      const { id } = req.params;
      const deleted = await tranDauService.deleteTranDauById(id);
      if (!deleted) return res.status(404).json({ message: 'Không tìm thấy' });
      res.json({ message: 'Xóa thành công' });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async getLichTapByMaTranDau(req, res) {
    try {
      const { maTranDau } = req.params;
      const lichList = await LichTapLuyen.find({ maTranDau }).populate('maDoiBong', 'tenDoiBong');
      res.json(lichList);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async getFullTranDau(req, res) {
    try {
      const { maTranDau } = req.params;
      const tranDau = await tranDauService.getTranDauByMa(maTranDau);
      if (!tranDau) return res.status(404).json({ message: 'Không tìm thấy' });

      const lichTap = await LichTapLuyen.find({ maTranDau }).populate('maDoiBong', 'tenDoiBong');
      res.json({ ...tranDau.toObject(), lichTapLuyen: lichTap });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }
  async getTranDaubyMaCauThu(req, res) {
    console.log('goi den day ');
    try {
      const { maNguoiDung } = req.params;
      const cauThu = await NguoiDung.findOne({ maNguoiDung: maNguoiDung });
      const doiHinh = await DoiHinh.findOne({ maDoiHinh: cauThu.maDoiHinh });
      const tranDau = await TranDau.find({ maDoiHinh: doiHinh.maDoiHinh });
      res.json(tranDau);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new TranDauController();
