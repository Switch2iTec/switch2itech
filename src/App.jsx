import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/ContextProvider';
import { toast } from 'sonner';

// Layout & Auth
import Layout from './components/Layout/Layout';
import ProtectedRoutes from './components/ProtectedRoutes';
import RequestAuth from './components/RequestAuth';
import { RoleGuard } from './context/ContextProvider';

// Helper for toast-enabled redirects
const ForbiddenRedirect = ({ to = "/", message = "Access Denied: You do not have permission to view this page." }) => {
  useEffect(() => {
    toast.error(message);
  }, [message]);
  return <Navigate to={to} replace />;
};

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

const AdminProjects = lazy(() => import('./pages/Admindashboard/Projectspage'));
const AdminUsers = lazy(() => import('./pages/Admindashboard/Userspage'));
const AdminProducts = lazy(() => import('./pages/Admindashboard/Productpage'));
const AdminTestimonials = lazy(() => import('./pages/Admindashboard/Testimonialspage'));
const AdminRevenue = lazy(() => import('./pages/Admindashboard/Revenuepage'));

const PageSkeleton = () => (
  <div className="h-screen w-full bg-background flex overflow-hidden">
    <div className="w-64 h-full border-r border-border shrink-0 bg-card p-5 hidden md:flex flex-col gap-6">
      <div className="h-10 bg-muted rounded-xl w-4/5 animate-pulse" />
      <div className="space-y-2 mt-2">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-11 bg-muted/50 rounded-xl animate-pulse" />
        ))}
      </div>
      <div className="mt-auto h-16 bg-muted/30 rounded-xl animate-pulse" />
    </div>
    <div className="flex-1 p-6 md:p-8 space-y-8 flex flex-col">
      <div className="h-32 bg-muted/30 rounded-2xl animate-pulse border border-border/50" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-muted/20 rounded-2xl animate-pulse border border-border/40" />
        ))}
      </div>
      <div className="flex-1 bg-card/20 border border-border/50 rounded-2xl animate-pulse" />
    </div>
  </div>
);

const App = () => {
  const { authenticated, loading } = useAuth();

  if (loading) return <PageSkeleton />;

  return (
    <Suspense fallback={<PageSkeleton />}>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Overview />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="support" element={<Support />} />
            <Route path="profile" element={<Profile />} />
            <Route path="testimonials" element={<Testimonials />} />
            <Route path="products" element={<Product />} />

            <Route path="admin/projects" element={<RoleGuard allowedRoles={["admin"]} fallback={<ForbiddenRedirect />}><AdminProjects /></RoleGuard>} />
            <Route path="admin/users" element={<RoleGuard allowedRoles={["admin"]} fallback={<ForbiddenRedirect />}><AdminUsers /></RoleGuard>} />
            <Route path="admin/products" element={<RoleGuard allowedRoles={["admin"]} fallback={<ForbiddenRedirect />}><AdminProducts /></RoleGuard>} />
            <Route path="admin/testimonials" element={<RoleGuard allowedRoles={["admin"]} fallback={<ForbiddenRedirect />}><AdminTestimonials /></RoleGuard>} />
            <Route path="admin/revenue" element={<RoleGuard allowedRoles={["admin"]} fallback={<ForbiddenRedirect />}><AdminRevenue /></RoleGuard>} />

            <Route
              path="analytics"
              element={
                <RoleGuard allowedRoles={["admin"]} fallback={<ForbiddenRedirect />}>
                  <Analytics />
                </RoleGuard>
              }
            />

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
                <RoleGuard allowedRoles={["admin", "manager"]} fallback={<ForbiddenRedirect message="Unauthorized: Only Managers and Admins can create projects." />}>
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
                <RoleGuard allowedRoles={["admin"]} fallback={<ForbiddenRedirect />}>
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

        <Route element={<RequestAuth />}>
          <Route path="/login" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;