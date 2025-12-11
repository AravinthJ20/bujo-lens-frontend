import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
const Base_URL = process.env.REACT_APP_API_BASE_URL;

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    scheduledTasks: 0,
    recentActivity: []
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${Base_URL}/api/dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setStats(res.data);
  };

  return (
    <div className="container-fluid pt-4" style={{ marginLeft: "10px" }}>

      {/* METRIC CARDS */}
      <div className="row g-4">
        <DashboardCard
          title="Total Tasks"
          value={stats.totalTasks}
          icon="bi-list-task"
          bg="bg-primary"
        />
        <DashboardCard
          title="Completed"
          value={stats.completedTasks}
          icon="bi-check-circle-fill"
          bg="bg-success"
        />
        <DashboardCard
          title="In Progress"
          value={stats.inProgressTasks}
          icon="bi-hourglass-split"
          bg="bg-warning text-dark"
        />
        <DashboardCard
          title="Scheduled"
          value={stats.scheduledTasks}
          icon="bi-calendar-event"
          bg="bg-info text-dark"
        />
      </div>

      {/* RECENT ACTIVITY */}
      <div className="card mt-5 p-4 shadow-sm border-0">
        <h5 className="fw-bold mb-3">Recent Activity</h5>

        {stats.recentActivity.length > 0 ? (
          stats.recentActivity.map((item, i) => (
            <div
              key={i}
              className="d-flex justify-content-between align-items-center border-bottom py-2"
            >
              <div>
                <span className="fw-bold me-2">{item.symbol}</span>
                <span>{item.text}</span>
                <span className="text-muted ms-2 small">({item.status})</span>
              </div>

              <div className="text-muted small">
                {item.time} • {item.date}
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">No activity yet</p>
        )}
      </div>

    </div>
  );
}

/* CARD COMPONENT */
function DashboardCard({ title, value, icon, bg }) {
  return (
    <div className="col-md-3">
      <div
        className={`card shadow-sm text-white p-4 border-0 dashboard-card ${bg}`}
        style={{
          borderRadius: "12px",
          transition: "all 0.2s ease-in-out",
          cursor: "pointer",
        }}
      >
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h3 className="fw-bold">{value}</h3>
            <p className="mb-0 opacity-75">{title}</p>
          </div>
          <i className={`bi ${icon} fs-1 opacity-75`}></i>
        </div>
      </div>
    </div>
  );
}
