import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/ContextProvider'

const ProtectedRoutes = () => {
  const { authenticated } = useAuth()

  return authenticated ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoutes