import React, { createContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../api/authApi";

// Create the context
export const AuthContext = createContext();

// Auth Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores logged-in user data
  const [loading, setLoading] = useState(true); // For checking session state on load
  const [error, setError] = useState(null); // For handling auth errors

  // Load user from localStorage when app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  /** 🔹 Register new user */
  const register = async (userData) => {
    try {
      const response = await registerUser(userData);
      return response; // Frontend Register.jsx handles redirection
    } catch (err) {
      console.error("Registration failed:", err);
      setError(err.response?.data?.message || "Registration failed");
      throw err;
    }
  };

  /** 🔹 Login user */
  const login = async (credentials) => {
    try {
      const response = await loginUser(credentials);
      const { access_token, user } = response.data;

      // Save auth data
      localStorage.setItem("token", access_token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      setError(null);
      return user;
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.response?.data?.message || "Invalid credentials");
      throw err;
    }
  };

  /** 🔹 Logout user */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  /** 🔹 Check if logged in */
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
