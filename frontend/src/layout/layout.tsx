import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function Layout() {
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main
        className={`w-[80vw] ${
          theme !== "light"
            ? "bg-[#252525] text-white"
            : "bg-[#F1F1F1] text-black"
        }`}
      >
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
