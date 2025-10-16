const doiHinhService = require('../services/doiHinhService');

class DoiHinhController {
  async createDoiHinh(req, res) {
    try {
      const doiHinh = await doiHinhService.createDoiHinh(req.body);
      res.status(201).json(doiHinh);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAllDoiHinh(req, res) {
    try {
      const doiHinhs = await doiHinhService.getAllDoiHinh();
      res.status(200).json(doiHinhs);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getDoiHinhById(req, res) {
    try {
      const { id } = req.params;
      const doiHinh = await doiHinhService.getDoiHinhById(id);
      if (!doiHinh) {
        return res.status(404).json({ message: 'DoiHinh not found' });
      }
      res.status(200).json(doiHinh);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateDoiHinh(req, res) {
    try {
      const { id } = req.params;
      const updatedDoiHinh = await doiHinhService.updateDoiHinh(id, req.body);
      if (!updatedDoiHinh) {
        return res.status(404).json({ message: 'DoiHinh not found' });
      }
      res.status(200).json(updatedDoiHinh);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteDoiHinh(req, res) {
    try {
      const { id } = req.params;
      const deletedDoiHinh = await doiHinhService.deleteDoiHinh(id);
      if (!deletedDoiHinh) {
        return res.status(404).json({ message: 'DoiHinh not found' });
      }
      res.status(200).json({ message: 'DoiHinh deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getDetailDoiHinh(req, res) {
    try {
      const { id } = req.params;
      const detailDoiHinh = await doiHinhService.getDetailDoiHinh(id);
      if (!detailDoiHinh) {
        console.log('khong tim thay doi hinh');
      } else res.status(200).json(detailDoiHinh);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new DoiHinhController();
