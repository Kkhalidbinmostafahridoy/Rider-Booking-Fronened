/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Navigate } from "react-router-dom";
import type { TRole } from "@/types";

export const withAuth = (
  Component: React.ComponentType<any>,
  requiredRole?: TRole
) => {
  const AuthWrapper: React.FC = (props) => {
    // Get user from localStorage
    const user = localStorage.getItem("user");
    const role = user ? JSON.parse(user)?.role : null;

    // Not logged in → redirect to login
    if (!role) {
      return <Navigate to="/login" replace />;
    }

    // Logged in but role mismatch → redirect to account status
    if (requiredRole && role !== requiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }

    // Authorized → render component
    return <Component {...props} />;
  };

  return AuthWrapper;
};
