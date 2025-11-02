// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import { loginUser, registerUser } from "../api/authApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user from localStorage on app start
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
      return response;
    } catch (err) {
      console.error("Registration failed:", err);
      setError(err.message || "Registration failed");
      throw err;
    }
  };

  /** 🔹 Login user */
  const login = async (credentials) => {
    try {
      const response = await loginUser(credentials);
      const { access_token, user } = response;

      localStorage.setItem("token", access_token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      setError(null);
      return user;
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.message || "Invalid credentials");
      throw err;
    }
  };

  /** 🔹 Logout user */
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

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

/* Custom hook for easy access */
export const useAuth = () => {
  return useContext(AuthContext);
};
