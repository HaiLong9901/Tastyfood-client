import React from 'react'
import Wrapper from '../../components/common/Wrapper'
import { GiTomato } from 'react-icons/gi'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../features/auth/authSlice'
import { USER_DEFAULT_AVATAR } from '../../shared/Constants'
import { FaFileInvoice, FaPizzaSlice, FaRegChartBar, FaSignOutAlt } from 'react-icons/fa'
function Admin() {
  return <div className="w-full h-screen bg-white"></div>
}

export default Admin
