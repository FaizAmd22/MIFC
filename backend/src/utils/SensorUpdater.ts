// import SensorService from "../services/SensorService";

// export const startSensorUpdater = () => {
//   let locationIndex = 1;

//   setInterval(async () => {
//     const location = `Location ${locationIndex}`; // Dummy location
//     locationIndex++; // Update lokasi setiap interval

//     try {
//       const updatedData = await SensorService.updateSensorLocation(location);
//       console.log(`Sensor data updated at ${new Date().toISOString()} with location: ${location}`);
//     } catch (error) {
//       console.error("Error updating sensor data:", error.message);
//     }
//   }, 60000); // Update data setiap 1 menit
// };
