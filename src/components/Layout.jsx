import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import HeaderForLogin from './HeaderForLogin'

function Layout({ loginHeaderPath = [] }) {
  const { pathname } = useLocation()
  return (
    <div>
      {loginHeaderPath.includes(pathname) ? <HeaderForLogin /> : <Header />} <Outlet />
    </div>
  )
}

export default Layout
