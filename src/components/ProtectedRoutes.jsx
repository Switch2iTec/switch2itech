import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";

const ProtectedRoutes = () => {
  const { authenticated, loading } = useAuth();

  // 1. Jab tak backend se user verify ho raha ho, tab tak redirect nahi karna
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // 2. Check agar user authenticated hai toh page dikhayein (Outlet),
  // varna login page par redirect kar dein.
  return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
