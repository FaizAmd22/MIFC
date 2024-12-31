import { Request, Response, NextFunction } from "express";
import CanvasService from "../services/CanvasService";

class CanvasController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await CanvasService.createCanvas(req.body);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await CanvasService.getAllCanvases();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const response = await CanvasService.deleteCanvas(id);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const response = await CanvasService.updateCanvas(id, req.body);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}



export default new CanvasController();
