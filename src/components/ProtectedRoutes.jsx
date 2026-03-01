import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/ContextProvider';
import { Loader2 } from 'lucide-react';

const ProtectedRoutes = () => {
  const { authenticated, loading } = useAuth();

  // While session is being verified, show a spinner — never redirect prematurely
  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-background gap-3">
        <Loader2 className="animate-spin text-primary" size={32} />
        <p className="text-sm text-muted-foreground font-medium">Verifying session…</p>
      </div>
    );
  }

  return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
