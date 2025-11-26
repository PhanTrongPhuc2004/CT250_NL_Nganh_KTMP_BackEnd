// src/controllers/VeController.js
const Ve = require('../models/Ve.model');
const veService = require('../services/veService');
const TranDau = require('../models/TranDau.model');
const MuaGiai = require('../models/MuaGiai.model');
const QRCode = require('qrcode');

class VeController {
  // === MUA VÉ ===
  muaVe = async (req, res) => {
    try {
      const { maTranDau, loaiVe, khuVuc, hangGhe } = req.body;
      const user = req.user;

      if (user.vaiTro !== 'nguoihammo') {
        return res.status(403).json({ message: 'Chỉ người hâm mộ mới mua vé được' });
      }

      const veData = { maTranDau, loaiVe, khuVuc, hangGhe };
      const newVe = await veService.muaVe(veData, user._id);

      const qrCode = await QRCode.toDataURL(`VE-${newVe.maVe}`);
      const updatedVe = await veService.updateVeById(newVe._id, { qrCode });

      res.json({ message: 'Mua vé thành công', data: updatedVe });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  muaNhieuVe = async (req, res) => {
    try {
      const { maTranDau, maCauHinhVe, soLuong } = req.body;
      const userId = req.user._id;

      if (!maTranDau || !maCauHinhVe || !soLuong || soLuong < 1 || soLuong > 10) {
        return res.status(400).json({ message: "Dữ liệu không hợp lệ" });
      }

      // Gọi service xử lý mua nhiều
      const result = await veService.muaNhieuVe({
        maTranDau,
        maCauHinhVe,
        soLuong,
        userId
      });

      res.json({
        message: `Mua thành công ${soLuong} vé!`,
        data: result
      });

    } catch (error) {
      console.error("Lỗi mua nhiều vé:", error);
      res.status(400).json({ message: error.message || "Không thể mua vé" });
    }
  };

  // === CRUD VÉ (ADMIN & USER) ===
  getAllVe = async (req, res) => {
    const list = await veService.getAllVe();
    res.json(list);
  };

  getVeByUser = async (req, res) => {
    try {
      const list = await veService.getVeByUser(req.user._id);
      if (!list || list.length === 0) return res.status(404).json({ message: 'Không có vé' });
      res.json(list);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Lỗi server' });
    }
  };

  getVeByMa = async (req, res) => {
    const ve = await veService.getVeByMa(req.params.maVe);
    if (!ve) return res.status(404).json({ message: 'Không tìm thấy' });
    res.json(ve);
  };

  getVeById = async (req, res) => {
    const ve = await veService.getVeById(req.params.id);
    if (!ve) return res.status(404).json({ message: 'Không tìm thấy' });
    res.json(ve);
  };

  getVeByMaTranDau = async (req, res) => {
    const list = await veService.getVeByMaTranDau(req.params.maTranDau);
    res.json(list);
  };

  updateVeByMa = async (req, res) => {
    const updated = await veService.updateVeByMa(req.params.maVe, req.body);
    if (!updated) return res.status(404).json({ message: 'Không tìm thấy' });
    res.json({ message: 'Cập nhật thành công', data: updated });
  };

  updateVeById = async (req, res) => {
    const updated = await veService.updateVeById(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Không tìm thấy' });
    res.json({ message: 'Cập nhật thành công', data: updated });
  };

  deleteVeByMa = async (req, res) => {
    const deleted = await veService.deleteVeByMa(req.params.maVe);
    if (!deleted) return res.status(404).json({ message: 'Không tìm thấy' });
    res.json({ message: 'Xóa thành công' });
  };

  deleteVeById = async (req, res) => {
    const deleted = await veService.deleteVeById(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Không tìm thấy' });
    res.json({ message: 'Xóa thành công' });
  };

  // === THỐNG KÊ DOANH THU CHÍNH ===
  async thongKeDoanhThu(req, res) {
    try {
      const { maGiaiDau, maMuaGiai, maTranDau, range } = req.query;

      const matchStage = { trangThai: 'da_thanh_toan' };

      if (maTranDau) {
        matchStage.maTranDau = maTranDau;
      }

      if (maMuaGiai && !maTranDau) {
        const tranDauList = await TranDau.find({ maMuaGiai }).select('maTranDau');
        const maTranDauList = tranDauList.map(t => t.maTranDau);
        if (maTranDauList.length > 0) {
          matchStage.maTranDau = { $in: maTranDauList };
        } else {
          return res.json({ timeSeries: [], byLoaiVe: [] });
        }
      }

      if (maGiaiDau && !maMuaGiai && !maTranDau) {
        const muaGiaiList = await MuaGiai.find({ maGiaiDau }).select('_id');
        const tranDauList = await TranDau.find({ maMuaGiai: { $in: muaGiaiList.map(m => m._id) } }).select('maTranDau');
        const maTranDauList = tranDauList.map(t => t.maTranDau);
        if (maTranDauList.length > 0) {
          matchStage.maTranDau = { $in: maTranDauList };
        } else {
          return res.json({ timeSeries: [], byLoaiVe: [] });
        }
      }

      // Lọc thời gian
      let dateFilter = {};
      if (range === 'daily') {
        const today = new Date(); today.setHours(0, 0, 0, 0);
        dateFilter = { $gte: today };
      } else if (range === 'weekly') {
        const start = new Date(); start.setHours(0, 0, 0, 0);
        start.setDate(start.getDate() - start.getDay() + 1);
        dateFilter = { $gte: start };
      } else if (range === 'monthly') {
        const start = new Date(); start.setHours(0, 0, 0, 0); start.setDate(1);
        dateFilter = { $gte: start };
      }
      if (Object.keys(dateFilter).length > 0) {
        matchStage.ngayMua = dateFilter;
      }

      // === DOANH THU THEO NGÀY ===
      const timeSeriesRaw = await Ve.aggregate([
        { $match: matchStage },
        {
          $group: {
            _id: { $dateToString: { format: "%d/%m/%Y", date: "$ngayMua" } },
            value: { $sum: "$giaVe" }
          }
        },
        { $sort: { _id: 1 } }
      ]);

      const dateMap = new Map(timeSeriesRaw.map(d => [d._id, d.value]));
      const startDate = new Date("2025-11-01");
      const today = new Date(); today.setHours(23, 59, 59, 999);
      const timeSeries = [];

      for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
        const key = d.toLocaleDateString("vi-VN");
        timeSeries.push({ date: key, value: dateMap.get(key) || 0 });
      }

      // === THEO LOẠI VÉ ===
      const byLoaiVe = await Ve.aggregate([
        { $match: matchStage },
        {
          $lookup: {
            from: 'cauhinhves',
            localField: 'maCauHinhVe',
            foreignField: 'maCauHinhVe',
            as: 'cauhinh'
          }
        },
        { $unwind: { path: '$cauhinh', preserveNullAndEmptyArrays: true } },
        {
          $group: {
            _id: '$cauhinh.loaiVe',
            soVe: { $sum: 1 },
            doanhThu: { $sum: '$giaVe' }
          }
        },
        {
          $project: {
            loaiVe: '$_id',
            soVe: 1,
            doanhThu: 1,
            _id: 0
          }
        }
      ]);

      res.json({
        timeSeries,
        byLoaiVe
      });

    } catch (error) {
      console.error("Lỗi thống kê doanh thu:", error);
      res.status(500).json({ message: "Lỗi server" });
    }
  }

  // TOP 5 TRẬN ĐẤU DOANH THU CAO NHẤT TRONG MÙA GIẢI (ĐÃ SỬA ĐÚNG!)
  async topMatchesInMuaGiai(req, res) {
    try {
      const { maMuaGiai } = req.query;

      const matchStage = { trangThai: 'da_thanh_toan' };

      if (maMuaGiai) {
        const tranDauList = await TranDau.find({ maMuaGiai }).select('maTranDau');
        if (tranDauList.length === 0) return res.json([]);
        matchStage.maTranDau = { $in: tranDauList.map(t => t.maTranDau) };
      }

      const result = await Ve.aggregate([
        { $match: matchStage },
        {
          $lookup: {
            from: 'trandaus',
            localField: 'maTranDau',
            foreignField: 'maTranDau',
            as: 'trandau'
          }
        },
        { $unwind: '$trandau' },
        {
          $group: {
            _id: '$maTranDau',
            tranDau: {
              $first: {
                $concat: [
                  { $ifNull: ['$trandau.doiNha.tenDoiBong', '$trandau.doiNha'] },
                  ' vs ',
                  { $ifNull: ['$trandau.doiKhach.tenDoiBong', '$trandau.doiKhach'] }
                ]
              }
            },
            ngayBatDau: { $first: '$trandau.ngayBatDau' },
            sanVanDong: { $first: '$trandau.diaDiem' },
            soVe: { $sum: 1 },
            doanhThu: { $sum: '$giaVe' }
          }
        },
        { $sort: { doanhThu: -1 } },
        { $limit: 5 },
        {
          $project: {
            _id: 0,
            tranDau: 1,
            ngayBatDau: 1,
            sanVanDong: 1,
            soVe: 1,
            doanhThu: 1
          }
        }
      ]);

      res.json(result);
    } catch (error) {
      console.error("Lỗi top trận đấu:", error);
      res.status(500).json([]);
    }
  }

  async topMatches(req, res) {
    await this.topMatchesInMuaGiai(req, res);
  }
}

module.exports = new VeController();