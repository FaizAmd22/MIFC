import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import TopSidebar from "./top-sidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useState, useEffect } from "react";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { Link, useLocation } from "react-router-dom";

// Menu items.
const mifcItem = [
  {
    title: "Caliper",
    url: "/caliper",
  },
  {
    title: "Clutch Disk",
    url: "/clutch-disk",
  },
  {
    title: "VCT",
    url: "/vct",
  },
];

// Menu items.
const menuItem = [
  {
    title: "JIT Dashboard",
    url: "/jit-dashboard",
  },
  {
    title: "Stagnation Problem Analysis",
    url: "/stagnation-problem-analysis",
  },
  {
    title: "Profile",
    url: "/profile",
  },
  {
    title: "Setting",
    url: "/setting",
  },
];

export function AppSidebar() {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const location = useLocation();
  const [activeItem, setActiveItem] = useState<string>("");

  // Update active item when location changes
  useEffect(() => {
    const currentPath = location.pathname;
    const activeMifcItem = mifcItem.find((item) => item.url === currentPath);
    const activeMenuItem = menuItem.find((item) => item.url === currentPath);
    setActiveItem(activeMifcItem?.title || activeMenuItem?.title || "");
  }, [location]);

  return (
    <Sidebar>
      <SidebarContent
        className={`${theme !== "light" ? "bg-[#2C2C2C]" : "bg-[#F5F5F5]"}`}
      >
        <SidebarGroup>
          <SidebarGroupLabel className="ml-2 mt-4 mb-10 flex justify-between">
            <TopSidebar />
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-5">
            <SidebarMenu
              className={`${theme !== "light" ? "text-white" : "text-black"}`}
            >
              {/* MIFC Item */}
              <p className="font-bold text-xl mb-2">MIFC</p>
              {mifcItem.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.url}
                      className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                        activeItem === item.title
                          ? "bg-red-600 text-white hover:bg-red-600 hover:text-white"
                          : theme !== "light"
                          ? "text-white hover:bg-[#2c2c2c] hover:text-white hover:font-semibold"
                          : "hover:font-semibold"
                      }`}
                    >
                      <HiMiniSquares2X2 />
                      <p className="text-lg">{item.title}</p>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* Menu Item */}
              <p className="font-bold text-xl mb-2 mt-8">Menu</p>
              {menuItem.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.url}
                      className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                        activeItem === item.title
                          ? "bg-red-600 text-white"
                          : theme !== "light"
                          ? "text-white hover:bg-[#2c2c2c] hover:text-white hover:font-semibold"
                          : "text-black hover:font-semibold"
                      }`}
                    >
                      <HiMiniSquares2X2 />
                      <p className="text-lg">{item.title}</p>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
