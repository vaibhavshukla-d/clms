import "./App.scss";
import {Route, Routes, useNavigate} from "react-router-dom";
import Layout from "./layout.jsx";
import DashboardPage from "@/pages/protected/Dashboard/DashboardPage.jsx";
import LoginPage from "./pages/public/LoginPage/LoginPage";
import {useEffect} from "react";
import BullionRate from "@/pages/protected/BullionRate/BullionRatePage.jsx";
import NotFoundPage from "@/pages/public/NotFoundPage/NotFoundPage.jsx";

function App() {
    const isAuth = localStorage.getItem("isAuthenticated");
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth !== "true") {
            navigate("/login");
        }
    }, [isAuth, navigate]);

    return (
        <Routes>
            {isAuth === "true" ? (
                    <Route path="/" element={<Layout/>}>
                        <Route path="/dashboard" element={<DashboardPage/>}/>
                        <Route path="/bullionrate" element={<BullionRate/>}/>
                    </Route>) :
                (
                    <Route path="/login" element={<LoginPage/>}/>
                )
            }
            <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
    );
}

export default App;
