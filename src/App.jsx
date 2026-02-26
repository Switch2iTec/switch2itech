import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/ContextProvider'; // Ensure this path is correct

// Layout & Auth Components
import Layout from './components/Layout/Layout';
import ProtectedRoutes from './components/ProtectedRoutes';
import RequestAuth from './components/RequestAuth';

// Page Components
import Overview from './pages/Admin/Overview';
import Team from './pages/Team/Team';
import Notifications from './pages/Notifications/Notifications';
import Profile from './pages/Profile/Profile';
import Project from './pages/Project/Product';
import Client from './pages/Client/Client';
import Testimonials from './pages/Testimonials/Testimonials';
import Addproject from './pages/Addproject/Addproject';
import Analytics from './pages/Analytics/Analytics';
import Product from './pages/Product/Product';
import Signin from './pages/Signin/Signin';
import Signup from './pages/Signup/Signup';
import NotFound from './pages/NotFound';
import Support from './pages/Support/Support';
import Adminprofile from './pages/Profile/Adminprofile';

import { RoleGuard } from './context/ContextProvider';

const App = () => {
  const { authenticated, loading } = useAuth();

  /**
   * 1. LOADING GATE
   * This prevents the app from flickering or redirecting to /login 
   * while the backend is checking your JWT cookie.
   */
  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-background">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-muted-foreground font-medium">Verifying Session...</p>
      </div>
    );
  }

  return (
    <Routes>
      {/* --- PROTECTED ROUTES (Requires Login) --- */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Overview />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="support" element={<Support />} />
          <Route path="profile" element={<Profile />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="products" element={<Product />} />

          {/* Admin Only Routes */}
          <Route
            path="analytics"
            element={
              <RoleGuard
                allowedRoles={["admin"]}
                fallback={<Navigate to="/" />}
              >
                <Analytics />
              </RoleGuard>
            }
          />

          <Route
            path="profile"
            element={
              <RoleGuard
                allowedRoles={["admin"]}
                fallback={<Navigate to="/profile" />}
              >
                <Profile />
              </RoleGuard>
            }
          />

          {/* Team / Internal Routes */}
          <Route
            path="projects"
            element={
              <RoleGuard
                allowedRoles={["admin", "manager", "developer"]}
                fallback={<NotFound />}
              >
                <Project />
              </RoleGuard>
            }
          />

          <Route
            path="add-project"
            element={
              <RoleGuard
                allowedRoles={["admin", "manager", "developer"]}
                fallback={<Navigate to="/projects" />}
              >
                <Addproject />
              </RoleGuard>
            }
          />

          <Route
            path="team"
            element={
              <RoleGuard
                allowedRoles={["admin", "manager", "developer"]}
                fallback={<NotFound />}
              >
                <Team />
              </RoleGuard>
            }
          />

          <Route
            path="clients"
            element={
              <RoleGuard
                allowedRoles={["admin", "manager"]}
                fallback={<NotFound />}
              >
                <Client />
              </RoleGuard>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* --- AUTH ROUTES (Only for logged-out users) --- */}
      <Route element={<RequestAuth />}>
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Routes>
  );
}

export default App;