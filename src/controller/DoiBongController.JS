// src/controller/DoiBongController.js
const doiBongService = require('../services/doiBongService');

class DoiBongController {
    async createDoiBong(req, res) {
        try {
            const data = req.body;
            const doiBong = await doiBongService.createDoiBong(data);
            res.status(201).json({ message: 'Tạo đội bóng thành công', data: doiBong });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllDoiBong(req, res) {
        try {
            const list = await doiBongService.getAllDoiBong();
            res.json(list);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server' });
        }
    }

    async getDoiBongByMa(req, res) {
        try {
            const { maDoiBong } = req.params;
            const doiBong = await doiBongService.getDoiBongByMa(maDoiBong);
            if (!doiBong) return res.status(404).json({ message: 'Không tìm thấy' });
            res.json(doiBong);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server' });
        }
    }

    async getDoiBongById(req, res) {
        try {
            const { id } = req.params;
            const doiBong = await doiBongService.getDoiBongById(id);
            if (!doiBong) return res.status(404).json({ message: 'Không tìm thấy' });
            res.json(doiBong);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server' });
        }
    }

    async updateDoiBongByMa(req, res) {
        try {
            const { maDoiBong } = req.params;
            const data = req.body;
            const updated = await doiBongService.updateDoiBongByMa(maDoiBong, data);
            if (!updated) return res.status(404).json({ message: 'Không tìm thấy' });
            res.json({ message: 'Cập nhật thành công', data: updated });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server' });
        }
    }

    async updateDoiBongById(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            const updated = await doiBongService.updateDoiBongById(id, data);
            if (!updated) return res.status(404).json({ message: 'Không tìm thấy' });
            res.json({ message: 'Cập nhật thành công', data: updated });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server' });
        }
    }

    async deleteDoiBongByMa(req, res) {
        try {
            const { maDoiBong } = req.params;
            const deleted = await doiBongService.deleteDoiBongByMa(maDoiBong);
            if (!deleted) return res.status(404).json({ message: 'Không tìm thấy' });
            res.json({ message: 'Xóa thành công' });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server' });
        }
    }

    async deleteDoiBongById(req, res) {
        try {
            const { id } = req.params;
            const deleted = await doiBongService.deleteDoiBongById(id);
            if (!deleted) return res.status(404).json({ message: 'Không tìm thấy' });
            res.json({ message: 'Xóa thành công' });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server' });
        }
    }
}

module.exports = new DoiBongController();