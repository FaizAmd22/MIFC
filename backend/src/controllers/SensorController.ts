import { Request, Response } from "express";
import SensorService from "../services/SensorService";

class SensorController {
  // Endpoint untuk menyimpan data sensor
  async create(req: Request, res: Response) {
      try {
      const response = await SensorService.createSensorData(req.body);
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Endpoint untuk mendapatkan semua data sensor
  async getSensorData(req: Request, res: Response) {
    try {
      const data = await SensorService.getSensorData();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
    const id = parseInt(req.params.id); // Ambil ID dari parameter URL
    if (!id) {
      res.status(400).json({ message: "ID and location are required" });
    }

      const response = await SensorService.updateSensorLocation(id, req.body);
      res.status(200).json(response); // Kirim data yang diperbarui sebagai respons
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new SensorController();
