import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/ContextProvider';
import { Loader2 } from 'lucide-react';

const RequestAuth = () => {
  const { authenticated, loading } = useAuth();

  // While session is being verified, show a spinner — prevents flickering on /login
  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-background gap-3">
        <Loader2 className="animate-spin text-primary" size={32} />
        <p className="text-sm text-muted-foreground font-medium">Loading…</p>
      </div>
    );
  }

  // If already authenticated, redirect to dashboard — otherwise show the auth page
  return authenticated ? <Navigate to="/profile" replace /> : <Outlet />;
};

export default RequestAuth;