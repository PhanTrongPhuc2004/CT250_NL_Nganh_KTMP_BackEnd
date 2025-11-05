// src/controllers/CauHinhVeController.js
const cauHinhVeService = require('../services/cauHinhVeService');

class CauHinhVeController {
    // CREATE
    async create(req, res) {
        try {
            const data = req.body;
            console.log('VT:', req.user.vaiTro);
            // console.log('Creating CauHinhVe with data:', data);
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
            const updated = await cauHinhVeService.updateByMa(ma, data);
            if (!updated) return res.status(404).json({ message: 'Không tìm thấy' });
            res.json({ message: 'Cập nhật thành công', data: updated });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server' });
        }
    }

    // UPDATE BY ID
    async updateById(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            const updated = await cauHinhVeService.updateById(id, data);
            if (!updated) return res.status(404).json({ message: 'Không tìm thấy' });
            res.json({ message: 'Cập nhật thành công', data: updated });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server' });
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