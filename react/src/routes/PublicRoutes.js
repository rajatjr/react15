import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function PublicRoutes() {
  const isLoggedIn = localStorage.getItem("isLoggedIn")

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />
  }
  return <Outlet />
}

export default PublicRoutes
