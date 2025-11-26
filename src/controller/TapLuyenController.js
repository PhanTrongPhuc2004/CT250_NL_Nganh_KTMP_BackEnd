// src/controller/LichTapLuyenController.js
const lichTapService = require('../services/tapLuyenService');
const TranDau = require('../models/TranDau.model');
const NguoiDung = require('../models/NguoiDung.model');
const CauThu = require('../models/cauthu');
const DoiHinh = require('../models/DoiHinh.model');
const { formatDate } = require('../utils/function/formatFunction');

class LichTapLuyenController {
  async createLichTap(req, res) {
    console.log('Tạo lịch tập:', req.body);
    const { maTranDau, maDoiHinh: maDoiHinhFromBody, ...data } = req.body;
    const io = req.app.get('io');

    try {
      let finalMaDoiHinh = maDoiHinhFromBody;

      if (!finalMaDoiHinh && maTranDau) {
        const tranDau = await TranDau.findOne({ maTranDau });
        if (!tranDau) throw new Error("Không tìm thấy trận đấu");
        finalMaDoiHinh = tranDau.maDoiHinh;
      }

      if (!finalMaDoiHinh) {
        return res.status(400).json({ message: "Thiếu mã đội hình" });
      }

      const lich = await lichTapService.createLichTap({
        ...data,
        maTranDau,
        maDoiHinh: finalMaDoiHinh,
      });

      const lichTap = await lichTapService.getLichTapById(lich._id);
      const cauThus = await CauThu.find({ maDoiHinh: finalMaDoiHinh });
      const doiHinh = await DoiHinh.findOne({ maDoiHinh: finalMaDoiHinh });

      const tieuDe = "Bạn có lịch tập luyện mới!";
      const noiDung = `Buổi tập vào lúc ${lichTap.thoiGian} ngày ${formatDate(lichTap.ngayBatDau)} tại ${lichTap.diaDiem || 'sân tập'}${lichTap.noiDung ? `\nNội dung: ${lichTap.noiDung}` : ''}`;

      // SỬA TẠI ĐÂY: DÙNG 'tapLuyen' THAY VÌ 'lich_tap'
      const ThongBao = require('../models/ThongBao.model');
      const thongBao = await ThongBao.create({
        tieuDe,
        noiDung,
        loai: 'tapLuyen',  // ĐÚNG THEO ENUM TRONG MODEL
        maNguoiGui: req.user?.maNguoiDung || 'system',
        isPublic: false,
        loaiNguoiNhan: 'noiBo',
        guiChoTatCa: false,
        maDoiHinh: finalMaDoiHinh,
        danhSachNhan: cauThus.map(ct => ({
          maNguoiNhan: ct.maNguoiDung,
          daDoc: false
        }))
      });

      console.log(`Đã tạo thông báo lịch tập: ${thongBao.maThongBao}`);

      // Gửi qua Socket.IO
      cauThus.forEach((cauThu) => {
        const roomName = `user_${cauThu.maNguoiDung}`;
        io.to(roomName).emit('notification', {
          title: tieuDe,
          message: noiDung,
          maLichTap: lichTap._id,
          maDoiHinh: finalMaDoiHinh,
          maThongBao: thongBao.maThongBao,
          loai: 'tapLuyen',  // Cũng sửa ở đây cho đồng bộ
          timestamp: new Date().toISOString(),
          type: 'system'
        });
      });

      // Thông báo cho HLV (nếu đang online)
      if (req.user?.maDoiHinh === finalMaDoiHinh) {
        io.to(`user_${req.user.maNguoiDung}`).emit('notification', {
          title: "Đã tạo lịch tập thành công!",
          message: `Đã gửi lịch tập đến ${cauThus.length} cầu thủ đội ${doiHinh?.tenDoiHinh || ''}`,
          loai: 'tapLuyen',
          timestamp: new Date().toISOString(),
          type: 'success'
        });
      }

      res.status(201).json({
        message: 'Tạo lịch tập thành công',
        data: lich,
        thongBao: thongBao.maThongBao,
        notifiedPlayers: cauThus.length,
      });

    } catch (error) {
      console.error('Lỗi tạo lịch tập:', error);
      res.status(400).json({ message: error.message || 'Lỗi server' });
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
  // Trong class LichTapLuyenController
  async getLichTapByCurrentDoiHinh(req, res) {
    try {
      const maDoiHinh = req.user.maDoiHinh; // Lấy từ token đã decode
      // console.log(maDoiHinh)
      if (!maDoiHinh) {
        return res.status(400).json({ message: "Bạn chưa thuộc đội hình nào" });
      }

      const list = await lichTapService.getLichTapByDoiHinh(maDoiHinh);
      res.json(list);
    } catch (error) {
      console.error("Lỗi lấy lịch tập theo đội hình:", error);
      res.status(500).json({ message: "Lỗi server" });
    }
  }
}

module.exports = new LichTapLuyenController();
