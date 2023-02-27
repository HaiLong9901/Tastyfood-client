import React from 'react'
import { FaRegCheckCircle } from 'react-icons/fa'

function SuccessBox({ title }) {
  return (
    <div className="w-screen h-full min-h-screen flex justify-center items-center bg-primaryColor/70 absolute top-0 left-0 ">
      <div className="w-[30%] h-[30%] bg-white p-[2rem] flex flex-col justify-center items-center gap-[2rem]">
        <h2 className="text-[3rem] font-bold text-green-400">{title}</h2>
        <FaRegCheckCircle className="text-[5rem] font-bold text-green-400" />
      </div>
    </div>
  )
}

export default SuccessBox
