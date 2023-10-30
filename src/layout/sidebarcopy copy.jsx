import { useState } from "react";
import {
  TbSquareRoundedChevronsLeft,
  TbSquareRoundedChevronsRight,
} from "react-icons/tb";
import { HiOutlineLogout } from "react-icons/hi";
import logo from "../assets/CS_Logo_web.png";
import { NavLink, useNavigate } from "react-router-dom";
import { BiHomeAlt2 } from "react-icons/bi";
import { AiOutlineGold } from "react-icons/ai";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  function handleLogout() {
    localStorage.setItem("isAuthenticated", false);
    navigate("/login");
  }

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <img src={logo} alt="My Logo" width="75" height="31" />
        <div className="toggle-button" onClick={toggleSidebar}>
          {collapsed ? (
            <div className="">
              <div>
                <TbSquareRoundedChevronsRight />
              </div>
              <div className="mt-10">
                <BiHomeAlt2 />
              </div>
              <div className="mt-5">
                <AiOutlineGold />
              </div>
              <div className="mt-96">
                <button
                  className="flex flex-row justify-center align-bottom"
                  onClick={handleLogout}
                >
                  <HiOutlineLogout />
                </button>
              </div>
            </div>
          ) : (
            <div>
              <TbSquareRoundedChevronsLeft />
            </div>
          )}
        </div>
      </div>
      <br />
      <NavLink
        to="/dashboard"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >
        Dashboard
      </NavLink>

      <button
        className="flex flex-row justify-center align-bottom mt-96 "
        onClick={handleLogout}
      >
        <HiOutlineLogout />
        <div className="ml-3">Logout</div>
      </button>
    </div>
  );
};

export default Sidebar;
