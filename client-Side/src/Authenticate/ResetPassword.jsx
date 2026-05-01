import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./forpassword.css";

function ResetPassword() {
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const API = import.meta.env.VITE_API_URL || "http://localhost:4050";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API}/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Password updated successfully");
      } else {
        setMessage(data.message || "Reset failed");
      }
    } catch {
      setMessage("Server error");
    }
  };

  return (
    <div className="auth-container">
      <h2>Reset Password</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        <input
          className="auth-input"
          type="password"
          placeholder="New password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="auth-button" type="submit">
          Reset Password
        </button>
      </form>

      {message && <p className="auth-message">{message}</p>}
    </div>
  );
}

export default ResetPassword;