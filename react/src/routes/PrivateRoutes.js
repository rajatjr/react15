import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoutes() {
  const isLoggedIn = localStorage.getItem("isLoggedIn")

  if (isLoggedIn) {
    return <Outlet />
  }
  return <Navigate to="/" />
}

export default PrivateRoutes
