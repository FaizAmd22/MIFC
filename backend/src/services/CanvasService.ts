import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Canvas } from "../entity/Canvas";

interface CreateCanvasDTO {
  fileName: string;
  shapes: any[];
  connections: any[];
}

export default new (class CanvasService {
  private readonly CanvasRepository: Repository<Canvas> =
    AppDataSource.getRepository(Canvas);

  async createCanvas(reqBody: CreateCanvasDTO): Promise<any> {
    try {
      const canvas = this.CanvasRepository.create({
        fileName: reqBody.fileName,
        shapes: reqBody.shapes,
        connections: reqBody.connections,
      });

      const data = await this.CanvasRepository.save(canvas);

      return {
        message: "Canvas created successfully",
        canvas: data,
      };
    } catch (error) {
      throw new Error("Failed to create canvas");
    }
  }

  async getAllCanvases() {
    try {
      return await this.CanvasRepository.find({
        relations: ["shapes", "connections"],
      });
    } catch (error) {
      throw new Error("Failed to retrieve canvases");
    }
  }

  async deleteCanvas(id: number) {
    try {
      const canvas = await this.CanvasRepository.findOneBy({ id });
      if (!canvas) {
        throw new Error("Canvas not found");
      }
      await this.CanvasRepository.delete(canvas);
      return {
        message: "Canvas successfully deleted",
      };
    } catch (error) {
      throw new Error("Failed to delete canvas");
    }
  }

  async updateCanvas(id: number, reqBody: any): Promise<any> {
    try {
      const canvas = await this.CanvasRepository.findOne({
        where: { id },
        relations: ["shapes", "connections"], // Pastikan relasi ikut dimuat
      });
  
      if (!canvas) {
        throw new Error("Canvas not found");
      }
  
      // Update hanya jika ada data baru
      if (reqBody.fileName) {
        canvas.fileName = reqBody.fileName;
      }
  
      if (reqBody.shapes) {
        canvas.shapes = reqBody.shapes.map((shape: any) => {
          if (!shape.id) {
            throw new Error("Each shape must have an ID for update.");
          }
          return { ...canvas.shapes.find(s => s.id === shape.id), ...shape };
        });
      }
  
      if (reqBody.connections) {
        canvas.connections = reqBody.connections.map((connection: any) => {
          if (!connection.id) {
            throw new Error("Each connection must have an ID for update.");
          }
          return { ...canvas.connections.find(c => c.id === connection.id), ...connection };
        });
      }
  
      // Save updated canvas
      const updatedCanvas = await this.CanvasRepository.save(canvas);
  
      return {
        message: "Canvas updated successfully",
        canvas: updatedCanvas,
      };
    } catch (error) {
      throw new Error("Failed to update canvas: " + error.message);
    }
  }
  

//   async updateCanvas(id: number, reqBody: any): Promise<any> {
//     try {
//       const canvas = await this.CanvasRepository.findOneBy({ id });
  
//       if (!canvas) {
//         throw new Error("Canvas not found");
//       }
  
//       // Update fields
//       canvas.fileName = reqBody.fileName ?? canvas.fileName;
//       canvas.shapes = reqBody.shapes ?? canvas.shapes;
//       canvas.connections = reqBody.connections ?? canvas.connections;
  
//       // Save updated canvas
//       const updatedCanvas = await this.CanvasRepository.save(canvas);
  
//       return {
//         message: "Canvas updated successfully",
//         canvas: updatedCanvas,
//       };
//     } catch (error) {
//       throw new Error("Failed to update canvas: " + error.message);
//     }
//   }
  
})();
