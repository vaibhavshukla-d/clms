import {useState} from 'react';
import {TbSquareRoundedChevronsLeft, TbSquareRoundedChevronsRight} from 'react-icons/tb';
import {HiOutlineLogout} from 'react-icons/hi';
import logo from '../assets/CS_Logo_web.png';
import { useNavigate  } from "react-router-dom";


const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(true);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    function handleLogout() {
        localStorage.setItem('isAuthenticated', false);
        navigate('/login');
    }

    return (
        <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                <img src={logo} alt="My Logo" width="75" height="31"/>
                <div className="toggle-button" onClick={toggleSidebar}>
                    {collapsed ? (
                        <div className="">
                            <div>
                                <TbSquareRoundedChevronsRight/>
                            </div>
                        </div>
                    ) : (
                        <TbSquareRoundedChevronsLeft/>
                    )}

                </div>
            </div>
            <br/>
            <button className="flex flex-row justify-center align-bottom"
            onClick={handleLogout}
            >
                <HiOutlineLogout/>
                <div className="ml-3">Logout</div>
            </button>
        </div>
    );
};

export default Sidebar;
