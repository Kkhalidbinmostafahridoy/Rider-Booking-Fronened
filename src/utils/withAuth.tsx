// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
// import { Navigate } from "react-router-dom";
// import type { TRole } from "@/types";

// export const withAuth = (
//   Component: React.ComponentType<any>,
//   requiredRole?: TRole
// ) => {
//   const AuthWrapper: React.FC = (props) => {
//     // Get user from localStorage
//     const user = localStorage.getItem("user");
//     const role = user ? JSON.parse(user)?.role : null;

//     // Not logged in → redirect to login
//     if (!role) {
//       return <Navigate to="/login" replace />;
//     }

//     // Logged in but role mismatch → redirect to account status
//     if (requiredRole && role !== requiredRole) {
//       return <Navigate to="/unauthorized" replace />;
//     }

//     // Authorized → render component
//     return <Component {...props} />;
//   };

//   return AuthWrapper;
// };

/********
 *
 *
 *
 *
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Navigate } from "react-router-dom";
import type { TRole } from "@/types";

// Safe parse utility
const safeParseUser = (): { role?: TRole } | null => {
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

export const withAuth = (
  Component: React.ComponentType<any>,
  requiredRole?: TRole
) => {
  const AuthWrapper: React.FC = (props) => {
    const user = safeParseUser();
    const role = user?.role || null;

    // Not logged in → redirect to login
    if (!role) {
      return <Navigate to="/login" replace />;
    }

    // Logged in but role mismatch → redirect to unauthorized page
    if (requiredRole && role !== requiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }

    // Authorized → render component
    return <Component {...props} />;
  };

  return AuthWrapper;
};
