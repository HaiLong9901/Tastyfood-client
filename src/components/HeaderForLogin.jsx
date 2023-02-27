import React from 'react'
import { GiTomato } from 'react-icons/gi'
import { FaTiktok, FaInstagram, FaFacebook } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import Wrapper from './common/Wrapper'

function HeaderForLogin() {
  const { pathname } = useLocation()
  return (
    <>
      <div className="w-full bg-primaryColor h-[3rem]">
        <Wrapper>
          <div className="w-full h-full flex justify-end gap-[2rem] items-center">
            <a href="https://www.facebook.com/HaiLong9901">
              <FaFacebook className="text-white text-[1.6rem]" />
            </a>
            <a href="https://www.facebook.com/HaiLong9901">
              <FaInstagram className="text-white text-[1.6rem]" />
            </a>
            <a href="https://www.facebook.com/HaiLong9901">
              <FaTiktok className="text-white text-[1.6rem]" />
            </a>
          </div>
        </Wrapper>
      </div>
      <div className="h-[5rem] bg-white">
        <Wrapper>
          <div className="flex gap-[2rem] items-center h-[5rem]">
            <Link to="/" className="flex items-center">
              <span className="text-[2.5rem] text-orangeColor font-logoFont">TastyF</span>
              <div className="flex items-baseline">
                <GiTomato className="text-[2.8rem] text-red-600" />
                <GiTomato className="text-[2.8rem] text-red-600" />
              </div>
              <span className="text-[2.5rem] text-orangeColor font-logoFont">d</span>
            </Link>
            <h3 className="text-[2.4rem] font-bold text-primaryColor">
              {pathname.includes('login') ? 'ĐĂNG NHẬP' : pathname.includes('register') ? 'ĐĂNG KÝ' : 'THANH TOÁN'}
            </h3>
          </div>
        </Wrapper>
      </div>
    </>
  )
}

export default HeaderForLogin
