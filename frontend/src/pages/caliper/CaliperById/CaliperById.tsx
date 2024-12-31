/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CanvasById from "./components/CanvasById";

// Komponen untuk halaman /caliper/:id
const CaliperById = () => {
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
    <div className="h-screen overflow-hidden">
      <div className="px-5 flex gap-10 items-center">
        <p className="text-3xl font-bold h-[10vh] flex items-center">
          MIFC Drawing
        </p>

        <Link to={`/caliper/${id}/edit`} className="bg-red-700 px-14 py-2 font-semibold rounded-full text-white text-lg">
          Edit
        </Link>
      </div>

      {/* Panggil CanvasComponent dengan data yang telah diambil */}
      <CanvasById data={canvasData} />
    </div>
  );
};

export default CaliperById;
