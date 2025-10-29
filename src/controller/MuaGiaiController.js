const muaGiaiService = require('../services/muaGiaiService');

class MuaGiaiController {
    async createMuaGiai(req, res) {
        try {
            const data = req.body;
            const muaGiai = await muaGiaiService.createMuaGiai(data);
            res.status(201).json({ message: 'Tạo mùa giải thành công', data: muaGiai });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllMuaGiai(req, res) {
        try {
            const list = await muaGiaiService.getAllMuaGiai();
            res.json(list);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server' });
        }
    }

    async getMuaGiaiByMa(req, res) {
        try {
            const { ma } = req.params;
            const muaGiai = await muaGiaiService.getMuaGiaiByMa(ma);
            if (!muaGiai) return res.status(404).json({ message: 'Không tìm thấy' });
            res.json(muaGiai);
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server' });
        }
    }

    async updateMuaGiai(req, res) {
        try {
            const { ma } = req.params;
            const data = req.body;
            const updated = await muaGiaiService.updateMuaGiai(ma, data);
            if (!updated) return res.status(404).json({ message: 'Không tìm thấy' });
            res.json({ message: 'Cập nhật thành công', data: updated });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server' });
        }
    }

    async deleteMuaGiai(req, res) {
        try {
            const { ma } = req.params;
            const deleted = await muaGiaiService.deleteMuaGiai(ma);
            if (!deleted) return res.status(404).json({ message: 'Không tìm thấy' });
            res.json({ message: 'Xóa thành công' });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi server' });
        }
    }
}

module.exports = new MuaGiaiController();