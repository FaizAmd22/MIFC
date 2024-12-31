import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { SensorData } from "../entity/SensorData";

export default new (class SensorService {
  private readonly sensorDataRepository: Repository<SensorData> =
    AppDataSource.getRepository(SensorData);

  // Method untuk membuat data dummy pertama kali
  async createSensorData(reqBody: any): Promise<any> {
    try {
      const sensor = this.sensorDataRepository.create({
        location: reqBody.location,
        timestamp: new Date(),
      });

      const sensorData = await this.sensorDataRepository.save(sensor);
      return {
        message: "Canvas created successfully",
        data: sensorData,
      };
    } catch (error) {
      throw new Error("Failed to create sensorData");
    }
  }

  // Method untuk mendapatkan semua data sensor
  async getSensorData(): Promise<SensorData[]> {
    return await this.sensorDataRepository.find();
  }

  async updateSensorLocation(id: number, reqBody: any): Promise<any> {
    try {
      // Temukan data berdasarkan ID
      const sensor = await this.sensorDataRepository.findOne({ where: { id } });
      if (!sensor) {
        throw new Error(`Sensor with ID ${id} not found`);
      }

      // Perbarui lokasi dan waktu
      if (!reqBody.location) {
        throw new Error("Location is required");
      }

      sensor.location = reqBody.location;
      sensor.timestamp = new Date();

      // Simpan pembaruan
      const updatedCanvas =  await this.sensorDataRepository.save(sensor);
      return {
        message: "Sensor updated successfully",
        data: updatedCanvas,
      };
    } catch (error) {
      throw new Error("Failed to update sensor: " + error.message);
    }
  }
})();
