import { CanvasSidebar } from "@/components/sidebar/canvas-sidebar"; // Import Canvas Sidebar untuk Rightbar
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

const Caliper = ({ children }: { children: React.ReactNode }) => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  return (
    <>
      <SidebarProvider>
      <div className="flex justify-center">
          <p className="text-3xl font-bold whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
            MIFC Drawing
          </p>
        </div>
      <main
        className={`w-full ${
          theme !== "light"
            ? "bg-[#252525] text-white"
            : "bg-[#F1F1F1] text-black"
        }`}
      >
      </main>
        <SidebarTrigger />
        {children}
        <CanvasSidebar />
    </SidebarProvider>
    </>
  );
};

export default Caliper;
