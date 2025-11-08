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

            // LẤY DỮ LIỆU CŨ TRƯỚC KHI CẬP NHẬT
            const oldConfig = await cauHinhVeService.getByMa(ma);
            if (!oldConfig) return res.status(404).json({ message: 'Không tìm thấy' });

            // TÍNH TỔNG GHẾ MỚI
            const batDau = data.soGheBatDau ?? oldConfig.soGheBatDau;
            const ketThuc = data.soGheKetThuc ?? oldConfig.soGheKetThuc;
            const tongMoi = ketThuc - batDau + 1;

            // ĐIỀU CHỈNH soGheConLai KHÔNG VƯỢT QUÁ tongMoi
            const soGheConLai = Math.min(oldConfig.soGheConLai, tongMoi);

            // GỌI SERVICE VỚI DỮ LIỆU ĐÃ ĐƯỢC XỬ LÝ
            const updated = await cauHinhVeService.updateByMa(ma, {
                ...data,
                tongSoGhe: tongMoi,
                soGheConLai: soGheConLai
            });

            if (!updated) return res.status(404).json({ message: 'Không tìm thấy' });
            res.json({ message: 'Cập nhật thành công', data: updated });
        } catch (error) {
            console.error('Lỗi cập nhật:', error);
            res.status(500).json({ message: error.message || 'Lỗi server' });
        }
    }

    // UPDATE BY ID
    async updateById(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;

            // LẤY DỮ LIỆU CŨ TRƯỚC KHI CẬP NHẬT
            const oldConfig = await cauHinhVeService.getById(id);
            if (!oldConfig) return res.status(404).json({ message: 'Không tìm thấy' });

            // TÍNH TỔNG GHẾ MỚI
            const batDau = data.soGheBatDau ?? oldConfig.soGheBatDau;
            const ketThuc = data.soGheKetThuc ?? oldConfig.soGheKetThuc;
            const tongMoi = ketThuc - batDau + 1;

            // ĐIỀU CHỈNH soGheConLai KHÔNG VƯỢT QUÁ tongMoi
            const soGheConLai = Math.min(oldConfig.soGheConLai, tongMoi);

            // GỌI SERVICE VỚI DỮ LIỆU ĐÃ ĐƯỢC XỬ LÝ
            const updated = await cauHinhVeService.updateById(id, {
                ...data,
                tongSoGhe: tongMoi,
                soGheConLai: soGheConLai
            });

            if (!updated) return res.status(404).json({ message: 'Không tìm thấy' });
            res.json({ message: 'Cập nhật thành công', data: updated });
        } catch (error) {
            console.error('Lỗi cập nhật:', error);
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