import { AppDataSource } from "./data-source";
import * as express from "express";
import * as cors from "cors";
import * as dotenv from "dotenv";
import router from "./route";
// import { startSensorUpdater } from "./utils/SensorUpdater"; 

dotenv.config();

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully!");

    const app = express();
    const { PORT = 3000 } = process.env;

    // Middleware
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/api/v1", router); // Group route

    // Memulai pembaruan data sensor secara berkala
    // startSensorUpdater();

    // Route not found handler (404)
    app.use(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        res.status(404).send({ message: "Not Found" });
      }
    );

    // Error Handling Middleware
    app.use(
      (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        const statusCode = err.status || 500;
        const message = err.message || "Internal Server Error";
        res.status(statusCode).json({ error: message });
      }
    );

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
