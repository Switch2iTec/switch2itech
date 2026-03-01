import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/ContextProvider';
import { Loader2 } from 'lucide-react';

// Layout & Auth
import Layout from './components/Layout/Layout';
import ProtectedRoutes from './components/ProtectedRoutes';
import RequestAuth from './components/RequestAuth';
import { RoleGuard } from './context/ContextProvider';

// Lazy-loaded page components — each gets its own JS chunk.
// The browser only downloads a page's code when the user first navigates to it.
const Overview = lazy(() => import('./pages/Admin/Overview'));
const Team = lazy(() => import('./pages/Team/Team'));
const Notifications = lazy(() => import('./pages/Notifications/Notifications'));
const Profile = lazy(() => import('./pages/Profile/Profile'));
const Project = lazy(() => import('./pages/Project/Product'));
const Client = lazy(() => import('./pages/Client/Client'));
const Testimonials = lazy(() => import('./pages/Testimonials/Testimonials'));
const Addproject = lazy(() => import('./pages/Addproject/Addproject'));
const Addproduct = lazy(() => import('./pages/Addproduct/Addproduct'));
const Analytics = lazy(() => import('./pages/Analytics/Analytics'));
const Product = lazy(() => import('./pages/Product/Product'));
const ProjectDetail = lazy(() => import('./pages/Project/ProjectDetail'));
const Support = lazy(() => import('./pages/Support/Support'));
const Signin = lazy(() => import('./pages/Signin/Signin'));
const Signup = lazy(() => import('./pages/Signup/Signup'));
const NotFound = lazy(() => import('./pages/NotFound'));

/** Full-screen loading spinner shown while a lazy chunk is loading */
const PageLoader = () => (
  <div className="h-screen w-full flex flex-col items-center justify-center bg-background gap-3">
    <Loader2 className="animate-spin text-primary" size={32} />
    <p className="text-sm text-muted-foreground font-medium">Loading…</p>
  </div>
);

const App = () => {
  const { authenticated, loading } = useAuth();

  // Loading gate: wait for session verification before rendering any routes.
  // This prevents the /login flash when the user is already authenticated.
  if (loading) return <PageLoader />;

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* ── PROTECTED ROUTES ─────────────────────────────────────────── */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Overview />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="support" element={<Support />} />
            <Route path="profile" element={<Profile />} />
            <Route path="testimonials" element={<Testimonials />} />
            <Route path="products" element={<Product />} />

            {/* Admin only */}
            <Route
              path="analytics"
              element={
                <RoleGuard allowedRoles={["admin"]} fallback={<Navigate to="/" />}>
                  <Analytics />
                </RoleGuard>
              }
            />

            {/* Manager / Admin routes */}
            <Route
              path="projects"
              element={
                <RoleGuard allowedRoles={["admin", "manager", "developer"]} fallback={<NotFound />}>
                  <Project />
                </RoleGuard>
              }
            />
            <Route
              path="add-project"
              element={
                <RoleGuard allowedRoles={["admin", "manager"]} fallback={<Navigate to="/" />}>
                  <Addproject />
                </RoleGuard>
              }
            />
            <Route
              path="projects/:id"
              element={
                <RoleGuard allowedRoles={["admin", "manager", "developer"]} fallback={<NotFound />}>
                  <ProjectDetail />
                </RoleGuard>
              }
            />
            <Route
              path="add-product"
              element={
                <RoleGuard allowedRoles={["admin"]} fallback={<Navigate to="/" />}>
                  <Addproduct />
                </RoleGuard>
              }
            />
            <Route
              path="team"
              element={
                <RoleGuard allowedRoles={["admin", "manager", "developer"]} fallback={<NotFound />}>
                  <Team />
                </RoleGuard>
              }
            />
            <Route
              path="clients"
              element={
                <RoleGuard allowedRoles={["admin", "manager", "developer", "client", "user"]} fallback={<NotFound />}>
                  <Client />
                </RoleGuard>
              }
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* ── AUTH ROUTES (redirect to dashboard if already logged in) ─── */}
        <Route element={<RequestAuth />}>
          <Route path="/login" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;