import * as express from "express";
import CanvasController from "../controllers/CanvasController";
import SensorController from "../controllers/SensorController";

const router = express.Router();

// Canvas routes
router.post("/canvas", CanvasController.create);
router.get("/canvas", CanvasController.getAll);
router.delete("/canvas/:id", CanvasController.delete);
router.put("/canvas/:id", CanvasController.update);

//sensor routes
router.post("/sensor", SensorController.create); // Ganti createSensorData dengan create
router.get("/sensor", SensorController.getSensorData);
router.put("/sensor/:id", SensorController.update);

export default router;
