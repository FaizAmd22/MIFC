import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useState } from "react";
import rightbarIcons from "@/pages/caliper/data/Icon";

export function CanvasSidebar() {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [activeIcon, setActiveIcon] = useState<string>("");

  return (
    <Sidebar side="right">
      <SidebarContent
        className={`${theme !== "light" ? "bg-[#2C2C2C]" : "bg-[#D9D9D9]"}`}
      >
        <SidebarGroup>
          <SidebarGroupLabel className="ml-2 mt-4 mb-4 font-bold">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent className="flex flex-wrap items-center space-y-  3 px-3">
            {rightbarIcons.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveIcon(item.name)}
                className={`flex flex-col items-center justify-center p-3 rounded-md w-1/2 ${
                  activeIcon === item.name
                    ? "bg-blue-500 text-white"
                    : theme !== "light"
                    ? "text-white hover:bg-gray-700"
                    : "text-black hover:bg-gray-200"
                }`}
              >
                <div className="text-xl">{item.icon}</div>
                <span className="text-xs mt-1">{item.name}</span>
              </button>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
