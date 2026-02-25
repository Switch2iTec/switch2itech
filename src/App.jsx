import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Overview from './pages/Admin/Overview'
import Team from './pages/Team/Team'
import Notifications from './pages/Notifications/Notifications'
import Profile from './pages/Profile/Profile'
import Project from './pages/Project/Product'
import Client from './pages/Client/Client'
import Testimonials from './pages/Testimonials/Testimonials'
import Addproject from './pages/Addproject/Addproject'
import Analytics from './pages/Analytics/Analytics'
import Product from './pages/Product/Product'
import ProtectedRoutes from './components/ProtectedRoutes'
import RequestAuth from './components/RequestAuth'
import Signin from './pages/Signin/Signin'
import Signup from './pages/Signup/Signup'
import NotFound from './pages/NotFound'
import Support from './pages/Support/Support'
import Adminprofile from './pages/Profile/Adminprofile'

import ContextProvider, { RoleGuard } from './context/ContextProvider'

const App = () => {
  return (
    <ContextProvider>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Layout />}>
            
            <Route index element={<Overview />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="support" element={<Support />} />
            <Route path="profile" element={<Profile />} />
            <Route path="testimonials" element={<Testimonials />} />
            <Route path="products" element={<Product />} />

            <Route path="analytics" element={
              <RoleGuard allowedRoles={['admin']} fallback={<Navigate to="/" />}>
                <Analytics />
              </RoleGuard>
            } />

            <Route path="admin-profile" element={
              <RoleGuard allowedRoles={['admin']} fallback={<Navigate to="/profile" />}>
                <Adminprofile />
              </RoleGuard>
            } />

            <Route path="projects" element={
              <RoleGuard allowedRoles={['admin', 'manager', 'developer']} fallback={<NotFound />}>
                <Project />
              </RoleGuard>
            } />

            <Route path="add-project" element={
              <RoleGuard allowedRoles={['admin', 'manager', 'developer']} fallback={<Navigate to="/projects" />}>
                <Addproject />
              </RoleGuard>
            } />

            <Route path="team" element={
              <RoleGuard allowedRoles={['admin', 'manager', 'developer']} fallback={<NotFound />}>
                <Team />
              </RoleGuard>
            } />

            <Route path="clients" element={
              <RoleGuard allowedRoles={['admin', 'manager']} fallback={<NotFound />}>
                <Client />
              </RoleGuard>
            } />

          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route element={<RequestAuth />}>
          <Route path="/login" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </ContextProvider>
  );
}

export default App