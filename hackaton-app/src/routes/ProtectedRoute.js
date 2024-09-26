import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, adminOnly }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;

  if (adminOnly && userRole !== "admin") {
    return <Navigate to="/home" />;
  }

  return children;
};

export default ProtectedRoute;
