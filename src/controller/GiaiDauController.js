const giaiDauService = require('../services/giaiDauService');

class GiaiDauController {
  async createGiaiDau(req, res) {
    console.log('tao giai dau', req.body);
    try {
      const data = req.body;
      const newGiaiDau = await giaiDauService.createGiaiDau(data);
      res.status(201).json(newGiaiDau);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async getAllGiaiDaus(req, res) {
    try {
      const giaiDaus = await giaiDauService.getAllGiaiDaus();
      res.status(200).json(giaiDaus);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async getGiaiDauById(req, res) {
    try {
      const id = req.params.id;
      const giaiDau = await giaiDauService.getGiaiDauById(id);
      if (!giaiDau) {
        return res.status(404).json({ error: 'Giải đấu không tồn tại' });
      }
      res.status(200).json(giaiDau);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async updateGiaiDau(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;
      const updatedGiaiDau = await giaiDauService.updateGiaiDau(id, data);
      if (!updatedGiaiDau) {
        return res.status(404).json({ error: 'Giải đấu không tồn tại' });
      }
      res.status(200).json(updatedGiaiDau);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async deleteGiaiDau(req, res) {
    try {
      const id = req.params.id;
      const deletedGiaiDau = await giaiDauService.deleteGiaiDau(id);
      if (!deletedGiaiDau) {
        return res.status(404).json({ error: 'Giải đấu không tồn tại' });
      }
      res.status(200).json({ message: 'Xóa giải đấu thành công' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getMatchesByGiaiDauId(req, res) {
    try {
      const giaiDauId = req.params.id;
      const matches = await giaiDauService.getMatchesByGiaiDauId(giaiDauId);
      console.log('matches', matches);
      res.status(200).json(matches);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new GiaiDauController();
