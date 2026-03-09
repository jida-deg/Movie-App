// src/components/Notifications.jsx
import React, { useContext } from "react";
import AuthContext from "./AuthProvider";

export default function Notifications({ open }) {
  const { notifications } = useContext(AuthContext);

  if (!open) return null; // hide if dropdown is closed

  return (
    <div
      className="notification-dropdown"
      style={{
        position: "absolute",
        top: "30px",
        right: "0",
        background: "#fff",
        border: "1px solid #ccc",
        borderRadius: "5px",
        width: "250px",
        maxHeight: "300px",
        overflowY: "auto",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        zIndex: 100,
        padding: "10px",
      }}
    >
      {notifications.length === 0 ? (
        <p style={{ margin: 0, fontSize: "14px" }}>No notifications</p>
      ) : (
        notifications.map((n) => (
          <div
            key={n._id}
            className="notification-item"
            style={{
              padding: "5px 0",
              borderBottom: "1px solid #eee",
              fontSize: "14px",
            }}
          >
            {n.message}
          </div>
        ))
      )}
    </div>
  );
}