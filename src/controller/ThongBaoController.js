const thongBaoService = require('../services/thongBaoService');

class ThongBaoController {
    async guiThongBao(req, res) {
        try {
            const data = { ...req.body, nguoiGuiId: req.user._id };
            if (data.isPublic && !['admin', 'huanluyenvien'].includes(req.user.vaiTro)) {
                return res.status(403).json({ message: 'Không có quyền' });
            }

            const io = req.app.get('io'); // ← LẤY io TỪ app
            const thongBao = await thongBaoService.guiThongBao(data, io);
            res.status(201).json({ message: 'Gửi thành công', data: thongBao });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async layThongBaoGanNhat(req, res) {
        try {
            const { limit = 5 } = req.query;
            const list = await thongBaoService.layThongBaoGanNhat(req.user._id, parseInt(limit));
            res.json(list);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server' });
        }
    }

    async layTatCaThongBao(req, res) {
        try {
            const { page = 1, limit = 10, loai } = req.query;
            const result = await thongBaoService.layTatCaThongBao(
                req.user._id,
                parseInt(page),
                parseInt(limit),
                loai || ''
            );
            res.json(result);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server' });
        }
    }

    async danhDauDaDoc(req, res) {
        try {
            const { maThongBao } = req.params;
            const result = await thongBaoService.danhDauDaDoc(maThongBao, req.user._id);
            if (result.modifiedCount === 0) {
                return res.status(404).json({ message: 'Không tìm thấy thông báo' });
            }
            res.json({ message: 'Đã đánh dấu đã đọc' });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server' });
        }
    }

    async danhDauTatCaDaDoc(req, res) {
        try {
            const count = await thongBaoService.danhDauTatCaDaDoc(req.user._id);
            res.json({ message: 'Đã đánh dấu tất cả', soLuong: count });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server' });
        }
    }

    async demThongBaoChuaDoc(req, res) {
        try {
            const count = await thongBaoService.demThongBaoChuaDoc(req.user._id);
            res.json({ chuaDoc: count });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server' });
        }
    }
}

module.exports = new ThongBaoController();