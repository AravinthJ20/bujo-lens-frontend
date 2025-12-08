import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";
export default function Sidebar() {
  const { pathname } = useLocation();
  
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();      // Clear token + user data
    sessionStorage.clear();    // Clear session data if any
    navigate("/login");        // Redirect to login
  };
  // Example – in real app get this from context or API
  const user = {
    name: localStorage.getItem("userName") || "User",
    email: localStorage.getItem("userEmail") || "user@example.com",
    avatar: "/default-avatar.png" // add image in public/
  };

  const menu = [
    { label: "Dashboard", path: "/home", icon: "bi-speedometer2" },

    { label: "Scan Page", path: "/scan", icon: "bi-camera" },
        { label: "Journal Entries", path: "/entries", icon: "bi-journal-text" },
    { label: "Calendar", path: "/calendar", icon: "bi-calendar3" },
    { label: "Profile", path: "/profile", icon: "bi-person-circle" },
    { label: "Logout", path: "/logout", icon: "bi-box-arrow-right" },
  ];

  return (
    <div className="sidebar-container">

      {/* PROFILE BLOCK */}
      {/* <div className="profile-block">
        <img src={user.avatar} alt="profile" className="profile-avatar" />
        <div className="profile-info">
          <h6 className="profile-name">{user.name}</h6>
          <p className="profile-email">{user.email}</p>
        </div>
      </div> */}

      {/* LOGO */}
      <div className="sidebar-header">
        <i className="bi bi-stars sidebar-logo"></i>
        <span className="sidebar-title">BuJo Lens</span>
      </div>

      {/* MENU LIST */}
      <ul className="sidebar-list">
  {menu.map((item) => (
    <li key={item.path}>
      {item.label === "Logout" ? (
        <button
          onClick={handleLogout}
          className="sidebar-item logout-btn"
        >
          <i className={`bi ${item.icon} sidebar-icon`}></i>
          <span>{item.label}</span>
        </button>
      ) : (
        <Link
          to={item.path}
          className={`sidebar-item ${
            pathname === item.path ? "active" : ""
          }`}
        >
          <i className={`bi ${item.icon} sidebar-icon`}></i>
          <span>{item.label}</span>

          {pathname === item.path && (
            <i className="bi bi-chevron-right ms-auto arrow"></i>
          )}
        </Link>
      )}
    </li>
  ))}
</ul>


    </div>
  );
}
