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
import { useState } from "react";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { Link } from "react-router-dom";

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
  const [activeItem, setActiveItem] = useState<string>("Caliper");

  return (
    <Sidebar>
      <SidebarContent
        className={`${theme !== "light" ? "bg-[#2C2C2C]" : "bg-[#D9D9D9]"}`}
      >
        <SidebarGroup>
          <SidebarGroupLabel className="ml-2 mt-4 mb-10 flex justify-between">
            <TopSidebar />
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-5">
            <SidebarMenu>
              {/* MIFC Item */}
              <p className="font-bold text-lg mb-2">MIFC</p>
              {mifcItem.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.url}
                      onClick={() => setActiveItem(item.title)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                        activeItem === item.title
                          ? "bg-red-600 text-white"
                          : theme !== "light"
                          ? "text-white hover:bg-gray-700"
                          : "text-black hover:bg-gray-300"
                      }`}
                    >
                      <HiMiniSquares2X2 />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* Menu Item */}
              <p className="font-bold text-lg mb-2 mt-8">Menu</p>
              {menuItem.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      onClick={() => setActiveItem(item.title)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                        activeItem === item.title
                          ? "bg-red-600 text-white"
                          : theme !== "light"
                          ? "text-white hover:bg-gray-700"
                          : "text-black hover:bg-gray-300"
                      }`}
                    >
                      <HiMiniSquares2X2 />
                      <span>{item.title}</span>
                    </a>
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
