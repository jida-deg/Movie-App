import React, { useState } from "react";
import "./forpassword.css"
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const API = import.meta.env.VITE_API_URL || "http://localhost:4050";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Password reset link sent to your email.");
      } else {
        setMessage(data.message || "Error sending email");
      }
    } catch {
      setMessage("Server error");
    }
  };

  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        <input
          className="auth-input"
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="auth-button" type="submit">
          Send Reset Link
        </button>
      </form>

      {message && <p className="auth-message">{message}</p>}
    </div>
  );
}

export default ForgotPassword;