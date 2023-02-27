import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../features/auth/authSlice'

function ProtectedRoute() {
  const token = useSelector(selectCurrentToken)
  const location = useLocation()
  return token ? <Outlet /> : <Navigate to="/login" state={{ from: location }} />
}

export default ProtectedRoute
