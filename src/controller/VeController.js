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
  thongKeDoanhThu = async (req, res) => {
    try {
      const { maGiaiDau, maMuaGiai, maTranDau, range } = req.query;
      let validMaTranDau = [];

      if (maTranDau) {
        validMaTranDau = [maTranDau];
      } else if (maMuaGiai) {
        const list = await TranDau.find({ maMuaGiai }).select('maTranDau');
        validMaTranDau = list.map(t => t.maTranDau);
      } else if (maGiaiDau) {
        const muaList = await MuaGiai.find({ maGiaiDau }).select('maMuaGiai');
        const maMuaList = muaList.map(m => m.maMuaGiai);
        const tranList = await TranDau.find({ maMuaGiai: { $in: maMuaList } }).select('maTranDau');
        validMaTranDau = tranList.map(t => t.maTranDau);
      } else {
        const list = await TranDau.find().select('maTranDau');
        validMaTranDau = list.map(t => t.maTranDau);
      }

      if (!validMaTranDau.length) {
        return res.json({ timeSeries: [], byLoaiVe: [] });
      }

      const match = { trangThai: 'da_thanh_toan', maTranDau: { $in: validMaTranDau } };

      if (range && range !== 'all') {
        const now = new Date();
        let start;
        if (range === 'daily') start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        else if (range === 'weekly') {
          const day = now.getDay();
          start = new Date(now);
          start.setDate(now.getDate() - (day === 0 ? 6 : day - 1));
          start.setHours(0, 0, 0, 0);
        } else if (range === 'monthly') start = new Date(now.getFullYear(), now.getMonth(), 1);
        match.ngayMua = { $gte: start };
      }

      const veList = await Ve.find(match).lean();
      const timeSeries = this.groupByTime(veList, range || 'daily');
      const byLoaiVe = veList.reduce((acc, ve) => {
        const k = ve.loaiVe || 'Khác';
        if (!acc[k]) acc[k] = { loaiVe: k, soVe: 0, doanhThu: 0 };
        acc[k].soVe++;
        acc[k].doanhThu += Number(ve.giaVe) || 0;
        return acc;
      }, {});

      res.json({
        timeSeries: Object.values(timeSeries),
        byLoaiVe: Object.values(byLoaiVe)
      });
    } catch (err) {
      console.error("Lỗi thống kê vé:", err.message, err.stack);
      res.status(500).json({ message: 'Lỗi server', error: err.message });
    }
  };

  // === TOP MATCHES ===
  topMatches = async (req, res) => {
    try {
      const top = await Ve.aggregate([
        { $match: { trangThai: 'da_thanh_toan' } },
        {
          $group: {
            _id: { maTranDau: "$maTranDau", loaiVe: "$loaiVe" },
            soVe: { $sum: 1 },
            doanhThu: { $sum: "$giaVe" }
          }
        },
        {
          $lookup: {
            from: 'trandau',
            localField: '_id.maTranDau',
            foreignField: 'maTranDau',
            as: 'tran'
          }
        },
        { $unwind: { path: '$tran', preserveNullAndEmptyArrays: true } },
        {
          $project: {
            tranDau: {
              $cond: [
                { $gt: ['$tran', null] },
                { $concat: ['$tran.doiNha', ' vs ', '$tran.doiKhach'] },
                'Không xác định'
              ]
            },
            loaiVe: '$_id.loaiVe',
            soVe: 1,
            doanhThu: 1
          }
        },
        { $sort: { doanhThu: -1 } },
        { $limit: 5 }
      ]);

      res.json(top);
    } catch (err) {
      console.error("Lỗi top matches:", err.message);
      res.status(500).json({ message: 'Lỗi server', error: err.message });
    }
  };

  // === HELPER ===
  groupByTime = (veList, range) => {
    const groups = {};
    veList.forEach(ve => {
      const d = new Date(ve.ngayMua);
      if (isNaN(d)) return;
      let key;
      if (range === 'daily') key = d.toLocaleDateString('vi-VN');
      else if (range === 'weekly') key = `Tuần ${this.getWeekNumber(d)}/${d.getFullYear()}`;
      else if (range === 'monthly') key = `${d.getMonth() + 1}/${d.getFullYear()}`;
      else key = d.toLocaleDateString('vi-VN');
      if (!groups[key]) groups[key] = { label: key, value: 0 };
      groups[key].value += Number(ve.giaVe) || 0;
    });
    return groups;
  };

  getWeekNumber = (d) => {
    const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = date.getUTCDay() || 7;
    date.setUTCDate(date.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getFullYear(), 0, 1));
    return Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
  };
}

module.exports = new VeController();