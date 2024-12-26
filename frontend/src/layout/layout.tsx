import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main
        className={`w-full ${
          theme !== "light"
            ? "bg-[#252525] text-white"
            : "bg-[#F1F1F1] text-black"
        }`}
      >
        {/* <SidebarTrigger /> */}
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
