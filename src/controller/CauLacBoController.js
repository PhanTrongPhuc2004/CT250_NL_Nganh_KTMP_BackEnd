const cauLacBoService = require('../services/cauLacBoService');

class CauLacBoController {
  async createCauLacBoInfor(req, res) {
    try {
      // Assuming you use a model named CauLacBo
      const club = await cauLacBoService.createInfor(req.body);
      res.status(201).json(club);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllInfor(req, res) {
    try {
      const clubs = await cauLacBoService.getAll();
      res.json(clubs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const club = await cauLacBoService.getById(req.params.id);
      if (!club) {
        return res.status(404).json({ error: 'Club not found' });
      }
      res.json(club);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateCauLacBoInfor(req, res) {
    console.log('Update request body:', req.body);
    try {
      const club = await cauLacBoService.updateInfor(req.params.id, req.body, { new: true });
      if (!club) {
        return res.status(404).json({ error: 'Club not found' });
      }
      res.json(club);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteCauLacBoInfor(req, res) {
    try {
      const club = await cauLacBoService.deleteCauLacBoInfor(req.params.id);
      if (!club) {
        return res.status(404).json({ error: 'Club not found' });
      }
      res.json({ message: 'Club deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new CauLacBoController();
