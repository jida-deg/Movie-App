// src/components/AuthProvider.jsx
import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [notifications, setNotifications] = useState([]);
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4050";

  // derived state: authenticated if a user object exists
  const isAuthenticated = !!user;

  const api = async (path, options = {}) => {
    const res = await fetch(`${API_BASE}${path}`, {
      credentials: "include",
      headers: { 
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
      ...options,
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || "API error");
    }
    return res.json();
  };

  // FETCH NOTIFICATIONS
  // Accept a token override so callers can invoke before state updates
  const fetchNotifications = async (tok) => {
    try {
      const authToken = tok || token;
      if (!authToken) return; // nothing to do

      // temporarily use the provided token when building headers
      const res = await fetch(`${API_BASE}/api/auth/notifications`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "API error");
      }
      const data = await res.json();
      setNotifications(data);
    } catch (err) {
      console.error("Notification error", err);
    }
  };

  // Save user in localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("active user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Handle Google OAuth redirect
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get('token');
    const userParam = urlParams.get('user');

    if (tokenParam && userParam) {
      try {
        const userData = JSON.parse(decodeURIComponent(userParam));
        setUser(userData);
        setToken(tokenParam);
        localStorage.setItem("token", tokenParam);
        localStorage.setItem("active user", JSON.stringify(userData));

        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);

        // Fetch notifications
        fetchNotifications(tokenParam);
      } catch (error) {
        console.error('Error parsing OAuth redirect data:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("active user", JSON.stringify(user));
    else localStorage.removeItem("active user");
  }, [user]);

  // automatically fetch when a token becomes available (e.g. after login or page reload)
  useEffect(() => {
    if (token) {
      fetchNotifications(token);
    }
  }, [token]);

const signIn = async (email, password) => {
  try {
    const data = await api("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("token", data.token);

    // token state will update shortly; fetch immediately with the returned token as well
    fetchNotifications(data.token);
    return true;
  } catch (err) {
    console.error("Login error:", err);
    return false;
  }
};

  const signUp = async (name, email, password) => {
    try {
      const data = await api("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("token", data.token);
      fetchNotifications(data.token);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const loginWithGoogle = () => {
    window.location.href = `${API_BASE}/api/auth/google`;
  };

  // sign the user out by clearing state and localStorage
  const signOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("active user");
    setNotifications([]);
  };

  const value = {
    user,
    setUser,
    token,
    setToken,
    notifications,
    isAuthenticated,
    API_BASE,
    fetchNotifications,
    signIn,
    signUp,
    loginWithGoogle,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;