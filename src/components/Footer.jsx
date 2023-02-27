import React from 'react'
import Wrapper from './common/Wrapper'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa'
import { GiTomato } from 'react-icons/gi'
function Footer() {
  return (
    <div className="bg-primaryColor py-[5rem]">
      <Wrapper>
        <div className="w-full flex lg:justify-start justify-between">
          <div className="lg:w-[25%] w-[15%]">
            <h4 className="text-[1.8rem] text-white">Menu</h4>
            <ul className="">
              <li className="py-[1rem]">
                <Link to="/" className="text-white text-[1.6rem] opacity-60">
                  Trang chủ
                </Link>
              </li>
              <li className="py-[1rem]">
                <Link to="/" className="text-white text-[1.6rem] opacity-60">
                  Giới thiệu
                </Link>
              </li>
              <li className="py-[1rem]">
                <Link to="/" className="text-white text-[1.6rem] opacity-60">
                  Thực đơn
                </Link>
              </li>
            </ul>
          </div>
          <div className="lg:w-[25%] w-[40%]">
            <h4 className="text-[1.8rem] text-white">Liên lạc với chúng tôi</h4>
            <ul>
              <li className="py-[1rem]">
                <Link to="/https://www.facebook.com/HaiLong9901" className="flex">
                  <FaFacebook className="text-white text-[2rem] opacity-60" />
                  <h4 className="text-[1.3rem] italic text-white opacity-60 ml-[1rem]">www.facebook.com/HaiLong9901</h4>
                </Link>
              </li>
              <li className="py-[1rem]">
                <Link to="/https://www.facebook.com/HaiLong9901" className="flex">
                  <FaInstagram className="text-white text-[2rem] opacity-60" />
                  <h4 className="text-[1.3rem] italic text-white opacity-60 ml-[1rem]">www.facebook.com/HaiLong9901</h4>
                </Link>
              </li>
              <li className="py-[1rem]">
                <Link to="/https://www.facebook.com/HaiLong9901" className="flex">
                  <FaTiktok className="text-white text-[2rem] opacity-60" />
                  <h4 className="text-[1.3rem] italic text-white opacity-60 ml-[1rem]">www.facebook.com/HaiLong9901</h4>
                </Link>
              </li>
            </ul>
          </div>
          <div className="lg:w-[50%] w-[35%] flex flex-col items-center lg:justify-start justify-center">
            <Link to="/" className="flex items-center">
              <span className="text-[2.5rem] text-white font-logoFont">TastyF</span>
              <div className="flex items-baseline">
                <GiTomato className="text-[2.8rem] text-red-600" />
                <GiTomato className="text-[2.8rem] text-red-600" />
              </div>
              <span className="text-[2.5rem] text-white font-logoFont">d</span>
            </Link>
            <p className="text-[2.4rem] italic text-orangeColor font-dancingScript py-[1rem]">
              "Trải nghiệm vô tận ..."
            </p>
            <p className="text-[1.6rem] text-white">&copy; Copyright by Hai Long</p>
          </div>
        </div>
      </Wrapper>
    </div>
  )
}

export default Footer
