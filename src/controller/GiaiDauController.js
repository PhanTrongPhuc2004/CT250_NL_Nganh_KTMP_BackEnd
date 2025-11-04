// src/controller/GiaiDauController.js
const giaiDauService = require('../services/giaiDauService');

class GiaiDauController {
    async createGiaiDau(req, res) {
        try {
            const data = req.body;
            const giaiDau = await giaiDauService.createGiaiDau(data);
            res.status(201).json({ message: 'Tạo giải đấu thành công', data: giaiDau });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllGiaiDau(req, res) {
        try {
            const list = await giaiDauService.getAllGiaiDau();
            res.json(list);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server' });
        }
    }

    async getGiaiDauByMa(req, res) {
        try {
            const { maGiaiDau } = req.params;
            const giaiDau = await giaiDauService.getGiaiDauByMa(maGiaiDau);
            if (!giaiDau) return res.status(404).json({ message: 'Không tìm thấy' });
            res.json(giaiDau);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server' });
        }
    }

    async getGiaiDauById(req, res) {
        try {
            const { id } = req.params;
            const giaiDau = await giaiDauService.getGiaiDauById(id);
            if (!giaiDau) return res.status(404).json({ message: 'Không tìm thấy' });
            res.json(giaiDau);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server' });
        }
    }

    async updateGiaiDauByMa(req, res) {
        try {
            const { maGiaiDau } = req.params;
            const data = req.body;
            const updated = await giaiDauService.updateGiaiDauByMa(maGiaiDau, data);
            if (!updated) return res.status(404).json({ message: 'Không tìm thấy' });
            res.json({ message: 'Cập nhật thành công', data: updated });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server' });
        }
    }

    async updateGiaiDauById(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            const updated = await giaiDauService.updateGiaiDauById(id, data);
            if (!updated) return res.status(404).json({ message: 'Không tìm thấy' });
            res.json({ message: 'Cập nhật thành công', data: updated });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server' });
        }
    }

    async deleteGiaiDauByMa(req, res) {
        try {
            const { maGiaiDau } = req.params;
            const deleted = await giaiDauService.deleteGiaiDauByMa(maGiaiDau);
            if (!deleted) return res.status(404).json({ message: 'Không tìm thấy' });
            res.json({ message: 'Xóa thành công' });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server' });
        }
    }

    async deleteGiaiDauById(req, res) {
        try {
            const { id } = req.params;
            const deleted = await giaiDauService.deleteGiaiDauById(id);
            if (!deleted) return res.status(404).json({ message: 'Không tìm thấy' });
            res.json({ message: 'Xóa thành công' });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server' });
        }
    }
}

module.exports = new GiaiDauController();