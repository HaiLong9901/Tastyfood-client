import React, { useEffect } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import Avatar from '../../components/common/Avatar'
import Wrapper from '../../components/common/Wrapper'
import { FaRegUser, FaFileInvoice } from 'react-icons/fa'
import { useGetUserQuery } from '../../features/apis/apiSlice'

function UserAccount() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  const { data: user, isSuccess } = useGetUserQuery()
  return (
    <div className="bg-gray-100 py-[2rem]">
      <Wrapper>
        <div className="flex justify-between">
          <div className="w-[20%] hidden lg:block">
            <div className="flex w-full gap-[2rem] items-center p-[1rem] border-b-solid border-b-[.1rem] border-b-secondaryColor box-border">
              <Avatar src={isSuccess && user.result.imageURL} alt="avatar" />
              <h4 className="text-[1.6rem] text-primaryColor font-bold">{isSuccess && user.result.name}</h4>
            </div>
            <div className="flex flex-col gap-[2rem] px-[1rem] py-[2rem]">
              <div className="flex gap-[1rem] items-center">
                <FaRegUser className="text-[1.6rem] w-[2rem]" />{' '}
                <span className="text-[1.6rem] font-bold">Tài khoản của tôi</span>
              </div>
              <NavLink
                to="/user/account/profile"
                className="ml-[3rem] text-[1.6rem]"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: '#FF8303',
                      }
                    : undefined
                }
              >
                Hồ sơ
              </NavLink>
              <NavLink
                to="/user/account/address"
                className="ml-[3rem] text-[1.6rem]"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: '#FF8303',
                      }
                    : undefined
                }
              >
                Địa chỉ
              </NavLink>
              <NavLink
                to="/user/account/password"
                className="ml-[3rem] text-[1.6rem]"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: '#FF8303',
                      }
                    : undefined
                }
              >
                Đổi mật khẩu
              </NavLink>
              <NavLink
                to="/user/purchase"
                style={({ isActive }) =>
                  isActive
                    ? {
                        color: '#FF8303',
                      }
                    : undefined
                }
                className="flex gap-[1rem] items-center"
              >
                <FaFileInvoice className="text-[1.6rem] w-[2rem]" />{' '}
                <span className="text-[1.6rem] font-bold">Đơn hàng</span>
              </NavLink>
            </div>
          </div>
          <div className="w-full lg:w-[75%] min-h-[80vh] md:min-h-[70vh] bg-white">
            <Outlet />
          </div>
        </div>
      </Wrapper>
    </div>
  )
}

export default UserAccount
