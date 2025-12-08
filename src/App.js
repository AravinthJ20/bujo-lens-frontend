import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import EntriesPage from "./pages/EntriesPage"
import { AuthProvider, AuthContext } from "./context/AuthContext";
import CalendarPage from "./pages/CalendarPage";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ScanPage from "./pages/ScanPage";
import SearchPage from "./pages/SearchPage";
import Profile from "./pages/Profile"

function AppLayout() {
  const { token } = useContext(AuthContext);
  const { pathname } = useLocation();

  // Hide sidebar/navbar on login & register pages
  const hideSidebar = pathname === "/login" || pathname === "/register";

  return (
    <>
      {!hideSidebar && token && <Sidebar />}
      {!hideSidebar && token && <Navbar />}

      <div className="main-content" style={{ marginTop:"65px",marginLeft: !hideSidebar && token ? "240px" : "0px" }}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

          <Route path="/entries" element={<ProtectedRoute><EntriesPage /></ProtectedRoute>} />

          <Route path="/calendar" element={<ProtectedRoute><CalendarPage /></ProtectedRoute>} />

          <Route path="/home" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

          <Route path="/scan" element={<ProtectedRoute><ScanPage /></ProtectedRoute>} />
        </Routes>
      </div>
    </>
  );
}


export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </AuthProvider>
  );
}
