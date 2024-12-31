/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CanvasComponent from "../components/CanvasKonva";

// Komponen untuk halaman /caliper/:id
const CaliperEdit = () => {
  const { id } = useParams(); // Ambil ID dari URL
  const [canvasData, setCanvasData] = useState<any>(null);

  // Ambil data canvas dari localStorage berdasarkan ID
  useEffect(() => {
    if (id) {
      const dataFiles = JSON.parse(localStorage.getItem("files") || "[]");
      const foundData = dataFiles.find((file: any) => file.id === id);
      if (foundData) {
        setCanvasData(foundData);
      }
    }
  }, [id]);

  if (!canvasData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="px-5">
        <p className="text-3xl font-bold h-[10vh] flex items-center">
          MIFC Drawing
        </p>
      </div>

      {/* Panggil CanvasComponent dengan data yang telah diambil */}
      <CanvasComponent data={canvasData} />
    </div>
  );
};

export default CaliperEdit;
