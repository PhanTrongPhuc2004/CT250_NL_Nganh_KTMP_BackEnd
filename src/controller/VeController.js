// src/controllers/VeController.js
const Ve = require('../models/Ve.model');
const veService = require('../services/veService');
const TranDau = require('../models/TranDau.model');
const MuaGiai = require('../models/MuaGiai.model');
const QRCode = require('qrcode');

class VeController {
  // === CRUD VÉ ===
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

  // === THỐNG KÊ DOANH THU ===
  async thongKeDoanhThu(req, res) {
    try {
      const { maGiaiDau, maMuaGiai, maTranDau, range } = req.query;
      console.log("Thống kê với:", { maGiaiDau, maMuaGiai, maTranDau, range });
      // Điều kiện lọc cơ bản
      const matchStage = { trangThai: 'da_thanh_toan' }; // Chỉ tính vé đã thanh toán

      // Lọc theo trận đấu nếu có
      if (maTranDau) {
        matchStage.maTranDau = maTranDau;
      }

      // Nếu có mùa giải → lấy danh sách trận đấu thuộc mùa đó
      if (maMuaGiai && !maTranDau) {
        const tranDauList = await TranDau.find({ maMuaGiai }).select('maTranDau');
        const maTranDauList = tranDauList.map(t => t.maTranDau);
        if (maTranDauList.length > 0) {
          matchStage.maTranDau = { $in: maTranDauList };
        } else {
          return res.json({ timeSeries: [], byLoaiVe: [] });
        }
      }

      // Nếu có giải đấu → lấy tất cả mùa + trận của giải đó
      if (maGiaiDau && !maMuaGiai && !maTranDau) {
        const tranDauList = await TranDau.find()
          .populate('maMuaGiai', 'maGiaiDau')
          .then(tranDaus => tranDaus.filter(t => t.maMuaGiai?.maGiaiDau === maGiaiDau));
        const maTranDauList = tranDauList.map(t => t.maTranDau);
        if (maTranDauList.length > 0) {
          matchStage.maTranDau = { $in: maTranDauList };
        } else {
          return res.json({ timeSeries: [], byLoaiVe: [] });
        }
      }

      // Xác định khoảng thời gian
      let dateFilter = {};
      if (range === 'daily') {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        dateFilter = { $gte: today };
      } else if (range === 'weekly') {
        const startOfWeek = new Date();
        startOfWeek.setHours(0, 0, 0, 0);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1); // Thứ 2
        dateFilter = { $gte: startOfWeek };
      } else if (range === 'monthly') {
        const startOfMonth = new Date();
        startOfMonth.setHours(0, 0, 0, 0);
        startOfMonth.setDate(1);
        dateFilter = { $gte: startOfMonth };
      }

      if (Object.keys(dateFilter).length > 0) {
        matchStage.ngayMua = dateFilter;
      }

      // === THỐNG KÊ THEO THỜI GIAN (từ 01/11/2025) ===
      const timeSeries = await Ve.aggregate([
        { $match: matchStage },
        {
          $group: {
            _id: { $dateToString: { format: "%d/%m/%Y", date: "$ngayMua" } },
            value: { $sum: "$giaVe" }
          }
        },
        { $sort: { _id: 1 } }
      ]);

      // ĐỔI TỪ 01/01/2025 → 01/11/2025
      const startDate = new Date("2025-11-01");  // ← CHỈNH DÒNG NÀY
      const today = new Date();
      today.setHours(23, 59, 59, 999);

      const dateMap = new Map(timeSeries.map(item => [item._id, item.value]));
      const fullTimeSeries = [];

      for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toLocaleDateString("vi-VN");
        fullTimeSeries.push({
          date: dateStr,
          label: dateStr,
          value: dateMap.get(dateStr) || 0
        });
      }

      // === THỐNG KÊ THEO LOẠI VÉ ===
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
        { $unwind: '$cauhinh' },
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
        timeSeries: fullTimeSeries,
        byLoaiVe: byLoaiVe.length > 0 ? byLoaiVe : []
      });

    } catch (error) {
      console.error("Lỗi thống kê doanh thu vé:", error);
      res.status(500).json({ message: "Lỗi server", error: error.message });
    }
  }

  // Top 5 trận đấu doanh thu cao
  async topMatches(req, res) {
    try {
      const result = await Ve.aggregate([
        { $match: { trangThai: 'da_thanh_toan' } },
        {
          $lookup: {
            from: 'cauhinhves',
            localField: 'maCauHinhVe',
            foreignField: 'maCauHinhVe',
            as: 'cauhinh'
          }
        },
        { $unwind: '$cauhinh' },
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
            _id: { maTranDau: '$maTranDau', loaiVe: '$cauhinh.loaiVe' },
            tranDau: { $first: { $concat: ['$trandau.doiNha', ' vs ', '$trandau.doiKhach'] } },
            loaiVe: { $first: '$cauhinh.loaiVe' },
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
            loaiVe: 1,
            soVe: 1,
            doanhThu: 1
          }
        }
      ]);

      res.json(result);
    } catch (error) {
      console.error("Lỗi top trận:", error);
      res.status(500).json([]);
    }
  }
}

module.exports = new VeController();