import React from 'react'
import Wrapper from '../components/common/Wrapper'
import { useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()
  return (
    <Wrapper>
      <div className="min-h-[70rem] lg:min-h-[50rem] w-full flex justify-center items-center flex-col gap-[2rem]">
        <h2 className="text-[3rem] text-orangeColor font-bold">404 Not found!</h2>
        <h3 className="text-gray-400 text-[1.8rem]">Trang không tồn tại</h3>
        <button
          className="bg-orangeColor text-white text-[1.5rem] py-[1rem] px-[2rem] rounded-[.5rem]"
          onClick={() => navigate('/')}
        >
          Quay về trang chủ
        </button>
      </div>
    </Wrapper>
  )
}

export default NotFound
