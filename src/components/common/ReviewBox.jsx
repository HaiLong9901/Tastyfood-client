import React from 'react'
import StarRate from './StarRate'

function ReviewBox({ imageURL, name, rate, review }) {
  return (
    <div className="w-full flex gap-[2rem] bg-yellowColor p-[1rem] rounded-[.5rem]">
      <div className="w-[5rem]">
        <div className="w-full aspect-square overflow-hidden rounded-[50%] object-cover">
          <img src={imageURL} alt="avatar" />
        </div>
      </div>
      <div className="w-full">
        <div className="w-full flex gap-[2rem] items-center">
          <h3 className="text-[1.8rem] font-bold text-primaryColor">{name}</h3>
          <StarRate rate={rate} />
        </div>
        <p className="text-[1.6rem] text-primaryColor mt-[1rem]">{review}</p>
      </div>
    </div>
  )
}

export default ReviewBox
