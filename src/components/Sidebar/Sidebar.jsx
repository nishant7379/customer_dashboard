import React from "react";
// CSS
import "./Sidebar.css";
// Logo
import { Logo } from "../../assets";
// react-icons
import { GoPerson } from "react-icons/go";
import { RiSettings4Line, RiFireLine } from "react-icons/ri";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { TbPhoto } from "react-icons/tb";
import { FiCalendar } from "react-icons/fi";
import { LuPieChart } from "react-icons/lu";

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Logo */}
      <img src={Logo} alt="Logo" className="logo" />
      <hr className="hr" />

      {/* Multiple Icons in Middle */}
      <div className="iconGroup">
        <GoPerson className="icon" />
        <IoCloudDownloadOutline className="icon" />
        <TbPhoto className="icon" />
        <FiCalendar className="icon" />
        <RiFireLine className="icon" />
        <LuPieChart className="icon" />
      </div>

      {/* Settings Icon */}
      <div className="bottomIcon">
        <RiSettings4Line className="icon" />
      </div>
    </div>
  );
};

export default Sidebar;
