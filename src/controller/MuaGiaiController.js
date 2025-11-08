const muaGiaiService = require('../services/muaGiaiService');
const giaiDauService = require('../services/giaiDauService');

class MuaGiaiController {
  async createMuaGiai(req, res) {
    console.log(req.body);
    try {
      const data = req.body;
      const muaGiai = await muaGiaiService.createMuaGiai(data);
      res.status(201).json({ message: 'Tạo mùa giải thành công', data: muaGiai });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllMuaGiais(req, res) {
    const maGiaiDau = req.query.maGiaiDau;
    try {
      if (maGiaiDau) {
        const list = await muaGiaiService.getMuaGiaiByMaGiaiDau(maGiaiDau);
        res.json(list);
      } else {
        const list = await muaGiaiService.getAllMuaGiai();
        res.json(list);
      }
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async getMuaGiaiByMa(req, res) {
    const { maGiaiDau } = req.params;
    console.log(maGiaiDau);
    try {
      const muaGiai = await muaGiaiService.getMuaGiaiByMa(maGiaiDau);
      if (!muaGiai) return res.status(404).json({ message: 'Không tìm thấy' });
      res.json(muaGiai);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async getMuaGiaiById(req, res) {
    try {
      const { id } = req.params;
      const muaGiai = await muaGiaiService.getMuaGiaiById(id);
      if (!muaGiai) return res.status(404).json({ message: 'Không tìm thấy' });
      res.json(muaGiai);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async updateMuaGiaiByMa(req, res) {
    try {
      const { maMuaGiai } = req.params;
      const data = req.body;
      const updated = await muaGiaiService.updateMuaGiaiByMa(maMuaGiai, data);
      if (!updated) return res.status(404).json({ message: 'Không tìm thấy' });
      res.json({ message: 'Cập nhật thành công', data: updated });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async updateMuaGiaiById(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updated = await muaGiaiService.updateMuaGiaiById(id, data);
      if (!updated) return res.status(404).json({ message: 'Không tìm thấy' });
      res.json({ message: 'Cập nhật thành công', data: updated });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async deleteMuaGiaiByMa(req, res) {
    try {
      const { maMuaGiai } = req.params;
      const deleted = await muaGiaiService.deleteMuaGiaiByMa(maMuaGiai);
      if (!deleted) return res.status(404).json({ message: 'Không tìm thấy' });
      res.json({ message: 'Xóa thành công' });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async deleteMuaGiaiById(req, res) {
    try {
      const { id } = req.params;
      const deleted = await muaGiaiService.deleteMuaGiaiById(id);
      if (!deleted) return res.status(404).json({ message: 'Không tìm thấy' });
      res.json({ message: 'Xóa thành công' });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }
  async updateMuaGiai(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;
      const updatedMuaGiai = await muaGiaiService.updateMuaGiai(id, data);
      if (!updatedMuaGiai) {
        return res.status(404).json({ error: 'Mùa giải không tồn tại' });
      }
      res.status(200).json(updatedMuaGiai);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteMuaGiai(req, res) {
    console.log('delete mua giai');
    try {
      const id = req.params.id;

      const deletedMuaGiai = await muaGiaiService.deleteMuaGiai(id);
      if (!deletedMuaGiai) {
        return res.status(404).json({ error: 'Mùa giải không tồn tại' });
      }
      res.status(200).json({ message: 'Xóa mùa giải thành công' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async getGiaiDauByMuaGiaiId(req, res) {
    try {
      const muaGiaiId = req.params.id;
      const giaiDaus = await giaiDauService.getGiaiDausByMuaGiaiId(muaGiaiId);
      res.status(200).json(giaiDaus);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async updateMuaGiai(req, res) {
    try {
      const { id } = req.params;
      const updateMuaGiai = await muaGiaiService.updateMuaGiaiById(id, req.body);

      if (!updateMuaGiai) {
        return res.status(404).json('Khong tim thay mua giai');
      }

      res.json(updateMuaGiai);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server' });
    }
  }

  async getTranDauByMaMuaGiai(req, res) {
    const maMuaGiai = req.params.maMuaGiai;
    console.log(maMuaGiai);
    try {
      const trandaus = await muaGiaiService.getTranDauByMaMuaGiai(maMuaGiai);
      if (!trandaus) res.status(404).json('Không có trận đấu nào được tìm thấy');
      res.json(trandaus);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new MuaGiaiController();
