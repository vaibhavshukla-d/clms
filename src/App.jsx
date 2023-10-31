import "./App.scss";
import { Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./layout.jsx";
import DashboardPage from "@/pages/protected/Dashboard/DashboardPage.jsx";
import LoginPage from "./pages/public/LoginPage/LoginPage";
import { useEffect, useState } from "react";
import BullionRate from "@/pages/protected/BullionRate/BullionRatePage.jsx";
import NotFoundPage from "@/pages/public/NotFoundPage/NotFoundPage.jsx";
import { fetchAndSetSystemCodeData } from "./utils/fetchAndSetSystemCodeData";


function App() {
  const isAuth = sessionStorage.getItem("isAuthenticated");
  const navigate = useNavigate();
  const [mouseMoved, setMouseMoved] = useState(false);

  useEffect(() => {
    if (isAuth !== "true" && window.location.pathname !== "/login") {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  useEffect(() => {
    fetchAndSetSystemCodeData();
  }, []);

  useEffect(() => {
    let mouseMoveTimeout;

    // Function to set isAuth to false and navigate to login
    const setInactive = () => {
      localStorage.setItem("isAuthenticated", "false");
      navigate("/login");
    };

    const resetTimeout = () => {
      clearTimeout(mouseMoveTimeout);
      mouseMoveTimeout = setTimeout(setInactive, 30000000); // 30 seconds
    };

    // Add an event listener to track mouse movement
    window.addEventListener("mousemove", () => {
      resetTimeout();
    });

    // Start the initial timeout
    resetTimeout();

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener("mousemove", resetTimeout);
    };
  }, [navigate]);

  return (
    <Routes>
      {isAuth === "true" ? (
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/bullionrate" element={<BullionRate />} />
          <Route path="/login" element={<DashboardPage />} />
        </Route>
      ) : (
        <Route path="/login" element={<LoginPage />} />
      )}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
