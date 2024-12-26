import { RootState } from "@/store";
import { useSelector } from "react-redux";
import CanvasComponent from "./components/CanvasKonva";
// import Canvas from "./components/canvas";

const Caliper = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  return (
    <div
      className={`w-[50vw] h-[50vh] ${
        theme !== "light"
          ? "bg-[#252525] text-white"
          : "bg-[#F1F1F1] text-black"
      }`}
    >
      <div className="flex items-center h-[10vh] px-5">
        <p className="text-3xl font-bold whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
          MIFC Drawing
        </p>
      </div>
      {/* <Canvas /> */}
      <CanvasComponent />
    </div>
  );
};

export default Caliper;
