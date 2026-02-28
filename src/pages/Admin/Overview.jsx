import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/ContextProvider';
import Top from './Top';
import Main from './Main';
import Bottom from './Bottom';
import ManagerDashboard from '../Dashboard/ManagerDashboard';
import DeveloperDashboard from '../Dashboard/DeveloperDashboard';

const Overview = () => {
  const { role, loading } = useAuth();
  const [currentView, setCurrentView] = useState('overview');

  if (loading) return null;

  // ── Admin: full dashboard ─────────────────────────────────────────────
  if (role === 'admin') {
    return (
      <div className="min-h-screen bg-background p-8 space-y-8">
        <Top currentView={currentView} setCurrentView={setCurrentView} />
        {currentView === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <Main />
            <Bottom />
          </div>
        )}
      </div>
    );
  }

  // ── Manager: their assigned projects dashboard ─────────────────────────
  if (role === 'manager') {
    return <ManagerDashboard />;
  }

  // ── Developer: their assigned tasks/projects dashboard ────────────────
  if (role === 'developer') {
    return <DeveloperDashboard />;
  }

  // ── Client / User / unknown: no dashboard → send to login ─────────────
  return <Navigate to="/login" replace />;
};

export default Overview;
