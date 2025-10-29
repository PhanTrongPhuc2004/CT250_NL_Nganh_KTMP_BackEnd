const giaiDauService = require('../services/giaiDauService');

class GiaiDauController {
    async createGiaiDau(req, res) {
        try {
            const data = req.body;
            const giaiDau = await giaiDauService.createGiaiDau(data);
            res.status(201).json({ message: 'Tạo giải đấu thành công', data: giaiDau });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server', error: error.message });
        }
    }

    async getAllGiaiDau(req, res) {
        try {
            const list = await giaiDauService.getAllGiaiDau();
            res.json(list);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server', error });
        }
    }

    async getGiaiDauByMa(req, res) {
        try {
            const { ma } = req.params;
            const giaiDau = await giaiDauService.getGiaiDauByMa(ma);
            if (!giaiDau) return res.status(404).json({ message: 'Không tìm thấy' });
            res.json(giaiDau);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server', error });
        }
    }

    async updateGiaiDau(req, res) {
        try {
            const { ma } = req.params;
            const data = req.body;
            const updated = await giaiDauService.updateGiaiDau(ma, data);
            if (!updated) return res.status(404).json({ message: 'Không tìm thấy' });
            res.json({ message: 'Cập nhật thành công', data: updated });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server', error });
        }
    }

    async deleteGiaiDau(req, res) {
        try {
            const { ma } = req.params;
            const deleted = await giaiDauService.deleteGiaiDau(ma);
            if (!deleted) return res.status(404).json({ message: 'Không tìm thấy' });
            res.json({ message: 'Xóa thành công' });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server', error });
        }
    }
}

module.exports = new GiaiDauController();