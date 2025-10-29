const muaGiaiService = require('../services/MuaGiaiService');
const giaiDauService = require('../services/giaiDauService');
class MuaGiaiController {
  async createMuaGiai(req, res) {
    try {
      const data = req.body;
      const newMuaGiai = await muaGiaiService.createMuaGiai(data);
      res.status(201).json(newMuaGiai);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllMuaGiais(req, res) {
    try {
      const muaGiais = await muaGiaiService.getAllMuaGiais();
      res.status(200).json(muaGiais);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async getMuaGiaiById(req, res) {
    try {
      const id = req.params.id;
      const muaGiai = await muaGiaiService.getMuaGiaiById(id);
      if (!muaGiai) {
        return res.status(404).json({ error: 'Mùa giải không tồn tại' });
      }
      res.status(200).json(muaGiai);
    } catch (error) {
      res.status(500).json({ error: error.message });
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
}

module.exports = new MuaGiaiController();
