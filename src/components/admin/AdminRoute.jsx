import React from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentRole, selectCurrentUser } from '../../features/auth/authSlice'
import AdminSidebar from './AdminSidebar'

function AdminRoute() {
  const isAdmin = useSelector(selectCurrentRole)
  const user = useSelector(selectCurrentUser)
  const location = useLocation()
  console.log('isAdmin: ', location)
  return isAdmin ? (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="w-[80%]">
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  )
}

export default AdminRoute
