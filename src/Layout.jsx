import {Outlet} from "react-router-dom";
import Sidebar from "./layout/sidebar.jsx";
import Header from "@/layout/header.jsx";

function Layout() {
    return (
        <>
            <main className="App">
                <div>
                    <Header/>
                </div>
                <Sidebar/>
                <Outlet/>
            </main>
        </>
    );
}

export default Layout;
