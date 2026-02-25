import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const RequestAuth = () => {
  const isToken = localStorage.getItem('token')

  return isToken ? <Navigate to="/" replace /> : <Outlet />
}

export default RequestAuth