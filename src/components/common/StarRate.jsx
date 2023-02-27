import React from 'react'
import { FaStar, FaRegStar } from 'react-icons/fa'

function StarRate({ rate }) {
  return (
    <div className="flex">
      {Array.apply(null, Array(5)).map((value, index) => {
        if (index < rate) return <FaStar className="text-[1.8rem] text-orangeColor" />
        return <FaRegStar className="text-[1.8rem] text-orangeColor" />
      })}
    </div>
  )
}

export default StarRate
