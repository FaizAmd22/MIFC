import { CiLight } from "react-icons/ci";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import userAvatar from "@/assets/Avatar.svg";
import { CiDark } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { toggleTheme } from "@/slices/themeSlice";
import Logo from "../../assets/logo_tmmin.svg";
import Logo2 from "../../assets/logo_tmmin2.svg";
import { Link } from "react-router-dom";

const TopSidebar = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <>
      {/* <div className="flex justify-center items-center">
        <Avatar>
          <AvatarImage src={userAvatar} alt="@shadcn" className="w-[20px]" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        
        <p className="text-lg text-red-600 uppercase font-bold">Digital Twin Dashboard</p>
      </div> */}
      <Link to={"/"}>
        <img
          src={theme === "light" ? Logo : Logo2}
          alt="Logo TMMIN"
          style={{ width: "120px", marginTop: "15px" }}
        />
      </Link>

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
            theme !== "light" ? "bg-red-600" : "bg-[#F5F5F5]"
          }`}
          onClick={() => dispatch(toggleTheme())}
        >
          <div
            className={`w-4 h-4 rounded-full shadow-md transform transition-transform ${
              theme !== "light"
                ? "translate-x-6 bg-white"
                : "translate-x-0  bg-red-600"
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
