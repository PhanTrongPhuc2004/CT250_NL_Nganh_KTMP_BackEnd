// src/controllers/CauHinhVeController.js
const cauHinhVeService = require('../services/cauHinhVeService');

class CauHinhVeController {
    // CREATE
    async create(req, res) {
        try {
            const data = req.body;
            const config = await cauHinhVeService.create(data);
            res.status(201).json({ message: 'Tạo cấu hình vé thành công', data: config });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // READ ALL
    async getAll(req, res) {
        try {
            const list = await cauHinhVeService.getAll();
            res.json(list);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi server' });
        }
    }

    // READ BY MA
    async getByMa(req, res) {
        try {
            const { ma } = req.params;
            const config = await cauHinhVeService.getByMa(ma);
            if (!config) return res.status(404).json({ message: 'Không tìm thấy' });
            res.json(config);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server' });
        }
    }

    // READ BY ID
    async getById(req, res) {
        try {
            const { id } = req.params;
            const config = await cauHinhVeService.getById(id);
            if (!config) return res.status(404).json({ message: 'Không tìm thấy' });
            res.json(config);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server' });
        }
    }

    // READ BY MATCH CODE
    async getByMaTranDau(req, res) {
        try {
            const { maTranDau } = req.params;
            const list = await cauHinhVeService.getByMaTranDau(maTranDau);
            res.json(list);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server' });
        }
    }

    // UPDATE BY MA
    async updateByMa(req, res) {
        try {
            const { ma } = req.params;
            const data = req.body;

            const oldConfig = await cauHinhVeService.getByMa(ma);
            if (!oldConfig) return res.status(404).json({ message: 'Không tìm thấy cấu hình vé' });

            const batDau = data.soGheBatDau ?? oldConfig.soGheBatDau;
            const ketThuc = data.soGheKetThuc ?? oldConfig.soGheKetThuc;

            if (batDau > ketThuc) {
                return res.status(400).json({ message: 'Số ghế bắt đầu phải nhỏ hơn hoặc bằng số ghế kết thúc' });
            }

            const tongMoi = ketThuc - batDau + 1;

            // BƯỚC 1: Tính số ghế đã bán (temp)
            const daBan = oldConfig.tongSoGhe - oldConfig.soGheConLai;

            // BƯỚC 2: Tính số ghế còn lại mới = tổng mới - số đã bán
            let soGheConLaiMoi = tongMoi - daBan;

            // BƯỚC 3: Đảm bảo không âm (nếu tổng mới < đã bán → full)
            soGheConLaiMoi = Math.max(0, soGheConLaiMoi);

            const updated = await cauHinhVeService.updateByMa(ma, {
                ...data,
                soGheBatDau: batDau,
                soGheKetThuc: ketThuc,
                tongSoGhe: tongMoi,
                soGheConLai: soGheConLaiMoi
            });

            res.json({
                message: 'Cập nhật cấu hình vé thành công',
                data: updated
            });
        } catch (error) {
            console.error('Lỗi cập nhật cấu hình vé:', error);
            res.status(500).json({ message: error.message || 'Lỗi server' });
        }
    }

    // UPDATE BY ID (dùng cho frontend - chính là cái bạn đang dùng)
    async updateById(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;

            const oldConfig = await cauHinhVeService.getById(id);
            if (!oldConfig) return res.status(404).json({ message: 'Không tìm thấy cấu hình vé' });

            const batDau = data.soGheBatDau ?? oldConfig.soGheBatDau;
            const ketThuc = data.soGheKetThuc ?? oldConfig.soGheKetThuc;

            if (batDau > ketThuc) {
                return res.status(400).json({ message: 'Số ghế bắt đầu phải nhỏ hơn hoặc bằng số ghế kết thúc' });
            }

            const tongMoi = ketThuc - batDau + 1;

            // BƯỚC 1: Tính số ghế đã bán từ dữ liệu cũ
            const daBan = oldConfig.tongSoGhe - oldConfig.soGheConLai;

            // BƯỚC 2: Áp dụng số đã bán vào tổng mới
            let soGheConLaiMoi = tongMoi - daBan;

            // BƯỚC 3: Không cho âm → nếu tổng mới nhỏ hơn số đã bán → còn lại = 0 (hết vé)
            soGheConLaiMoi = Math.max(0, soGheConLaiMoi);

            const updated = await cauHinhVeService.updateById(id, {
                ...data,
                soGheBatDau: batDau,
                soGheKetThuc: ketThuc,
                tongSoGhe: tongMoi,
                soGheConLai: soGheConLaiMoi
            });

            res.json({
                message: 'Cập nhật cấu hình vé thành công',
                data: updated
            });
        } catch (error) {
            console.error('Lỗi cập nhật cấu hình vé:', error);
            res.status(500).json({ message: error.message || 'Lỗi server' });
        }
    }

    // DELETE BY MA
    async deleteByMa(req, res) {
        try {
            const { ma } = req.params;
            const deleted = await cauHinhVeService.deleteByMa(ma);
            if (!deleted) return res.status(404).json({ message: 'Không tìm thấy' });
            res.json({ message: 'Xóa thành công' });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server' });
        }
    }

    // DELETE BY ID
    async deleteById(req, res) {
        try {
            const { id } = req.params;
            const deleted = await cauHinhVeService.deleteById(id);
            if (!deleted) return res.status(404).json({ message: 'Không tìm thấy' });
            res.json({ message: 'Xóa thành công' });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server' });
        }
    }
}

module.exports = new CauHinhVeController();