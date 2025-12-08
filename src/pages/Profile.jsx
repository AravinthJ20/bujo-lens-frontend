import React from "react";

export default function Profile() {
  const user = {
    name: localStorage.getItem("userName") || "User",
    email: localStorage.getItem("userEmail") || "user@example.com",
  };

  return (
    <div className="container p-4">
      <h2 className="fw-bold">👤 Profile</h2>

      <div className="card shadow-sm p-4 mt-3">
        <h5>Name: {user.name}</h5>
        <h6>Email: {user.email}</h6>
      </div>
    </div>
  );
}
