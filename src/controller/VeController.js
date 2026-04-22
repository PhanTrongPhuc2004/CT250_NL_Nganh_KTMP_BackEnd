// src/controllers/VeController.js
const Ve = require('../models/Ve.model');
const veService = require('../services/veService');
const TranDau = require('../models/TranDau.model');
const MuaGiai = require('../models/MuaGiai.model');
const QRCode = require('qrcode');

class VeController {
  // ================== MUA VÉ ==================
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

  // ================== XEM VÉ ==================
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

  // === API MỚI: LẤY TẤT CẢ VÉ ĐÃ MUA (cho trang quản lý tổng hợp) ===
  getAllPurchasedTickets = async (req, res) => {
    try {
      const ves = await Ve.aggregate([
        {
          $match: {
            trangThai: { $in: ['cho_thanh_toan', 'da_thanh_toan', 'da_vao_san'] }
          }
        },
        { $lookup: { from: 'trandaus', localField: 'maTranDau', foreignField: 'maTranDau', as: 'tranDauInfo' } },
        { $unwind: { path: '$tranDauInfo', preserveNullAndEmptyArrays: true } },
        { $lookup: { from: 'nguoidungs', localField: 'maNguoiDung', foreignField: '_id', as: 'nguoiMua' } },
        { $unwind: { path: '$nguoiMua', preserveNullAndEmptyArrays: true } },
        { $lookup: { from: 'doibongs', localField: 'tranDauInfo.doiNha', foreignField: '_id', as: 'doiNhaInfo' } },
        { $lookup: { from: 'doibongs', localField: 'tranDauInfo.doiKhach', foreignField: '_id', as: 'doiKhachInfo' } },
        {
          $project: {
            _id: 1,
            maVe: 1,
            giaVe: 1,
            trangThai: 1,
            ngayMua: 1,
            khuVuc: 1,
            hangGhe: 1,
            soGhe: 1,
            loaiVe: 1,
            qrCode: 1,
            nguoiMua: {
              hoVaTen: '$nguoiMua.hoVaTen',
              email: '$nguoiMua.email',
              soDienThoai: '$nguoiMua.soDienThoai'
            },
            doiNha: { $ifNull: [{ $arrayElemAt: ['$doiNhaInfo.tenDoiBong', 0] }, '$tranDauInfo.doiNha'] },
            doiKhach: { $ifNull: [{ $arrayElemAt: ['$doiKhachInfo.tenDoiBong', 0] }, '$tranDauInfo.doiKhach'] },
            ngayBatDau: '$tranDauInfo.ngayBatDau',
            diaDiem: { $ifNull: ['$tranDauInfo.diaDiem', 'Chưa xác định'] }
          }
        },
        { $sort: { ngayMua: -1 } }
      ]);

      res.json(ves);
    } catch (error) {
      console.error("Lỗi lấy danh sách vé đã mua:", error);
      res.status(500).json({ message: "Lỗi server" });
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

  // ================== ADMIN: XÁC NHẬN THANH TOÁN ==================
  getVeChoXacNhan = async (req, res) => {
    try {
      const ves = await Ve.aggregate([
        { $match: { trangThai: "cho_thanh_toan" } },
        { $lookup: { from: 'trandaus', localField: 'maTranDau', foreignField: 'maTranDau', as: 'tranDauInfo' } },
        { $unwind: { path: '$tranDauInfo', preserveNullAndEmptyArrays: true } },
        { $lookup: { from: 'nguoidungs', localField: 'maNguoiDung', foreignField: '_id', as: 'nguoiMua' } },
        { $unwind: { path: '$nguoiMua', preserveNullAndEmptyArrays: true } },
        { $lookup: { from: 'doibongs', localField: 'tranDauInfo.doiNha', foreignField: '_id', as: 'doiNhaInfo' } },
        { $lookup: { from: 'doibongs', localField: 'tranDauInfo.doiKhach', foreignField: '_id', as: 'doiKhachInfo' } },
        {
          $project: {
            _id: 1, maVe: 1, giaVe: 1, trangThai: 1, ngayMua: 1,
            khuVuc: 1, hangGhe: 1, soGhe: 1, loaiVe: 1, qrCode: 1,
            nguoiMua: { hoVaTen: '$nguoiMua.hoVaTen', email: '$nguoiMua.email', soDienThoai: '$nguoiMua.soDienThoai' },
            doiNha: { $ifNull: [{ $arrayElemAt: ['$doiNhaInfo.tenDoiBong', 0] }, '$tranDauInfo.doiNha'] },
            doiKhach: { $ifNull: [{ $arrayElemAt: ['$doiKhachInfo.tenDoiBong', 0] }, '$tranDauInfo.doiKhach'] },
            ngayBatDau: '$tranDauInfo.ngayBatDau',
            diaDiem: { $ifNull: ['$tranDauInfo.diaDiem', 'Chưa xác định'] }
          }
        },
        { $sort: { ngayMua: -1 } }
      ]);
      res.json(ves);
    } catch (error) {
      console.error("Lỗi lấy vé chờ xác nhận:", error);
      res.status(500).json({ message: "Lỗi server" });
    }
  };

  xacNhanThanhToan = async (req, res) => {
    try {
      const { ids } = req.body;
      if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ message: "Chưa chọn vé nào" });
      }

      const result = await Ve.updateMany(
        { _id: { $in: ids }, trangThai: 'cho_thanh_toan' },
        { trangThai: 'da_thanh_toan', updatedAt: new Date() }
      );

      res.json({
        message: `Đã xác nhận thanh toán thành công ${result.modifiedCount} vé!`,
        modifiedCount: result.modifiedCount
      });
    } catch (error) {
      console.error("Lỗi xác nhận thanh toán:", error);
      res.status(500).json({ message: "Lỗi server" });
    }
  };

  checkInVe = async (req, res) => {
    try {
      const { maVe } = req.params;
      const ve = await Ve.findOneAndUpdate(
        { maVe, trangThai: 'da_thanh_toan' },
        { trangThai: 'da_vao_san', daVaoSanTai: new Date() },
        { new: true }
      ).populate('maNguoiDung', 'hoVaTen email');

      if (!ve) return res.status(400).json({ message: "Vé không hợp lệ !" });

      res.json({
        message: "Check-in thành công!",
        ve: {
          maVe: ve.maVe,
          hoVaTen: ve.maNguoiDung?.hoVaTen || 'Không rõ',
          khuVuc: ve.khuVuc,
          hangGhe: ve.hangGhe,
          soGhe: ve.soGhe,
          tranDau: ve.maTranDau
        }
      });
    } catch (error) {
      console.error("Lỗi check-in:", error);
      res.status(500).json({ message: "Lỗi check-in" });
    }
  };

  // ================== CẬP NHẬT / XÓA ==================
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

      // CHỈ TÍNH VÉ ĐÃ THANH TOÁN THẬT SỰ
      const matchStage = { trangThai: 'da_thanh_toan' };

      // Lọc theo trận/mùa/giải
      if (maTranDau) {
        matchStage.maTranDau = maTranDau;
      } else if (maMuaGiai) {
        const tranDauList = await TranDau.find({ maMuaGiai }).distinct('maTranDau');
        if (tranDauList.length === 0) return res.json({ timeSeries: [], byLoaiVe: [], totalRevenue: 0 });
        matchStage.maTranDau = { $in: tranDauList };
      } else if (maGiaiDau) {
        const muaGiaiList = await MuaGiai.find({ maGiaiDau }).distinct('_id');
        const tranDauList = await TranDau.find({ maMuaGiai: { $in: muaGiaiList } }).distinct('maTranDau');
        if (tranDauList.length === 0) return res.json({ timeSeries: [], byLoaiVe: [], totalRevenue: 0 });
        matchStage.maTranDau = { $in: tranDauList };
      }

      // Lọc thời gian
      const now = new Date();
      if (range === 'daily') {
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        matchStage.ngayMua = { $gte: today };
      } else if (range === 'weekly') {
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay() + 1); // Thứ 2 tuần này
        startOfWeek.setHours(0, 0, 0, 0);
        matchStage.ngayMua = { $gte: startOfWeek };
      } else if (range === 'monthly') {
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        matchStage.ngayMua = { $gte: startOfMonth };
      }

      // === DOANH THU THEO NGÀY (CHỈ DỮ LIỆU THỰC TẾ) ===
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

      // KHÔNG TẠO NGÀY TRỐNG NỮA → Chỉ trả về những ngày có bán vé
      const timeSeries = timeSeriesRaw.map(item => ({
        date: item._id,
        value: item.value
      }));

      const totalRevenue = timeSeries.reduce((sum, item) => sum + item.value, 0);

      // === THEO LOẠI VÉ (JOIN QUA CauHinhVe ĐÚNG CÁCH) ===
      const byLoaiVeRaw = await Ve.aggregate([
        { $match: matchStage },
        {
          $lookup: {
            from: 'cauhinhves',
            localField: 'maCauHinhVe',
            foreignField: '_id', // ← Quan trọng: maCauHinhVe trong Vé lưu ObjectId
            as: 'config'
          }
        },
        { $unwind: { path: '$config', preserveNullAndEmptyArrays: true } },
        {
          $group: {
            _id: '$config.loaiVe',
            soVe: { $sum: 1 },
            doanhThu: { $sum: '$giaVe' }
          }
        }
      ]);

      const byLoaiVe = byLoaiVeRaw.map(item => ({
        loaiVe: item._id || 'Khác',
        soVe: item.soVe,
        doanhThu: item.doanhThu
      }));

      res.json({ timeSeries, byLoaiVe, totalRevenue });
    } catch (error) {
      console.error("Lỗi thống kê doanh thu:", error);
      res.status(500).json({ message: "Lỗi server" });
    }
  }

  // HÀM topMatchesInMuaGiai (đã đúng, giữ nguyên)
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
}

module.exports = new VeController();