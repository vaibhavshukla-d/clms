import { useState, useContext } from "react";
import {
  TbSquareRoundedChevronsLeft,
  TbSquareRoundedChevronsRight,
} from "react-icons/tb";
import { HiOutlineLogout } from "react-icons/hi";
import logo from "../assets/CS_Logo_web.png";
import { NavLink, useNavigate } from "react-router-dom";
import { BiHomeAlt2 } from "react-icons/bi";
import { AiOutlineGold } from "react-icons/ai";
import AuthContext from "../context/AuthContext/AuthContext";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  function handleLogout() {
    sessionStorage.setItem("isAuthenticated", false);
    setAuth(false);
    navigate("/login");
  }

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <img src={logo} alt="My Logo" width="75" height="31" />
        <div className="toggle-button">
          {collapsed ? (
            <div className="">
              <div onClick={toggleSidebar}>
                <TbSquareRoundedChevronsRight />
              </div>
              <div className="mt-10">
                <NavLink to="/dashboard">
                  <BiHomeAlt2 />
                </NavLink>
              </div>
              <div className="mt-5">
                <NavLink to="/bullionrate">
                  <AiOutlineGold />
                </NavLink>
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
            <div onClick={toggleSidebar}>
              <TbSquareRoundedChevronsLeft />
            </div>
          )}
        </div>
      </div>
      <br />
      <div className="mt-4">
        <div className="flex">
          <BiHomeAlt2 className="mr-2" />
          <NavLink
            to="/dashboard"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            <h1>Dashboard</h1>
          </NavLink>
        </div>
        <div className="flex mt-5">
          <AiOutlineGold className="mr-2 " />
          <NavLink
            to="/bullionrate"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            <h1>Bullion Rate</h1>
          </NavLink>
        </div>
        <button
          className="flex flex-row justify-center align-bottom mt-96 "
          onClick={handleLogout}
        >
          <HiOutlineLogout />
          <div className="ml-2">
            <h1>Logout</h1>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
