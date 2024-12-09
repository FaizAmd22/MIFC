/* eslint-disable react-hooks/rules-of-hooks */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CiLight } from "react-icons/ci";
import { CiDark } from "react-icons/ci";
import userAvatar from "@/assets/Avatar.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { toggleTheme } from "@/slices/themeSlice";

const TopSidebar = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <>
      <div className="flex justify-center items-center">
        {/* Avatar */}
        <Avatar>
          <AvatarImage src={userAvatar} alt="@shadcn" className="w-[20px]" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        {/* Text */}
        <p className="text-lg text-[#FF2626] ml-[-8px]">Mazer</p>
      </div>

      {/* Theme Mode */}
      <div className="flex justify-center gap-3">
        <CiLight
          className={`text-2xl ${
            theme !== "light" ? "text-white" : "text-black"
          }`}
        />

        {/* Toogle */}
        <div
          className={`w-12 h-6 flex items-center p-1 rounded-full cursor-pointer border border-black ${
            theme !== "light" ? "bg-[#FF2626]" : "bg-[#D9D9D9]"
          }`}
          onClick={() => dispatch(toggleTheme())}
        >
          <div
            className={`w-4 h-4 rounded-full shadow-md transform transition-transform ${
              theme !== "light"
                ? "translate-x-6 bg-white"
                : "translate-x-0  bg-[#FF2626]"
            }`}
          ></div>
        </div>
        <CiDark
          className={`text-2xl ${
            theme !== "light" ? "text-white" : "text-black"
          }`}
        />
      </div>
    </>
  );
};

export default TopSidebar;
