/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import { Canvas, Rect, Image as FabricImage } from "fabric";
import listIcons from "./data/Icon";

const CanvasComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricCanvas = useRef<Canvas | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Inisialisasi Canvas
    fabricCanvas.current = new Canvas(canvasRef.current, {
      width: 1600,
      height: 850,
      backgroundColor: "#f3f4f6",
    });

    // Tambahkan objek persegi (contoh default)
    const rect = new Rect({
      left: 200,
      top: 200,
      fill: "blue",
      width: 100,
      height: 100,
    });
    fabricCanvas.current.add(rect);

    // Cleanup saat komponen di-unmount
    return () => {
      fabricCanvas.current?.dispose();
    };
  }, []);

  // Fungsi untuk menambahkan ikon ke canvas
  const handleAddIcon = (iconUrl: string) => {
    if (!fabricCanvas.current) return;

    // Menggunakan fabric.Image.fromURL dengan Promise untuk memuat gambar
    FabricImage.fromURL(iconUrl).then((img) => {
      img.set({
        left: Math.random() * 600, // Posisi acak
        top: Math.random() * 400,
        scaleX: 0.5, // Skala agar lebih kecil
        scaleY: 0.5,
      });

      fabricCanvas.current?.add(img); // Tambahkan ke canvas
      fabricCanvas.current?.renderAll(); // Render ulang
    });
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Tombol loopable untuk menambahkan ikon */}
      <div className="flex flex-wrap gap-4">
        {listIcons.map((icon, index) => (
          <button
            key={index}
            onClick={() => handleAddIcon((icon.icon as any).props.src)}
            className="flex flex-col items-center p-2 bg-gray-200 hover:bg-gray-300 rounded transition"
          >
            {icon.icon}
            <span className="text-xs mt-1">{icon.name}</span>
          </button>
        ))}
      </div>

      {/* Canvas */}
      <canvas ref={canvasRef} className="border border-gray-400 shadow-lg" />
    </div>
  );
};

export default CanvasComponent;