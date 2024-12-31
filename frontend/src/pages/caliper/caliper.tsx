/* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa6";
// import CanvasComponent from "./components/CanvasKonva";

const Caliper = () => {
  // const [canvasData, setCanvasData] = useState<any>(null);
  const dataFiles = JSON.parse(localStorage.getItem("files") || "[]");
  const navigate = useNavigate();
  console.log("dataFiles: ", dataFiles);

  // Fungsi untuk membuat canvas baru
  const handleCreateCanvas = () => {
    const newId = Date.now().toString();
    const newCanvas = {
      id: newId,
      fileName: "New Canvas",
      icons: [],
      connections: [],
    };

    // Simpan canvas baru ke localStorage
    const savedFiles = JSON.parse(localStorage.getItem("files") || "[]");
    savedFiles.push(newCanvas);
    localStorage.setItem("files", JSON.stringify(savedFiles));

    // Arahkan ke canvas yang baru dibuat
    navigate(`/caliper/${newId}`);
  };

  return (
    <div className="px-5">
      <p className="text-3xl font-bold h-[10vh] flex items-center">
        MIFC Drawing
      </p>

      {/* Tampilkan tombol untuk membuat canvas baru */}
      <div className="flex justify-between">
        <p className="font-semibold text-2xl">Recently Files</p>
        <Button
          className="bg-red-600 hover:bg-red-700 px-8 py-5 text-lg rounded-full"
          onClick={handleCreateCanvas}
        >
          <FaPlus />
          Create New Canvas
        </Button>
      </div>

      {/* Tampilkan daftar canvas yang sudah disimpan */}
      {dataFiles.length > 0 ? (
        <div className="mt-5">
          {dataFiles.map((data: any) => (
            <Link key={data.id} to={`/caliper/${data.id}`} className="hover:underline hover:font-semibold">
              <div className="bg-[#F5F5F5] p-4 mb-4 rounded">
                <p className="text-xl">{data.fileName}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>No files available</p>
      )}
    </div>
  );
};

export default Caliper;
