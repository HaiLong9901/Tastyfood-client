import React from 'react'
import { useNavigate } from 'react-router-dom'
import Wrapper from './common/Wrapper'

function Slider({ background, title, desc, id }) {
  const navigate = useNavigate()
  return (
    <div
      className="lg:h-[calc(100vh-8rem)] h-[calc(50vh-8rem)] !bg-no-repeat !bg-center !bg-cover"
      style={{
        background: `linear-gradient(0, rgba(57, 62, 70,0.5), rgba(34, 40, 49,0.8)), url(${background})`,
      }}
    >
      <Wrapper>
        <div className="w-full h-full flex justify-evenly items-center">
          <div className="w-[30%] h-[50%] flex flex-col gap-[1rem] justify-center">
            <h3 className="text-[4rem] lg:text-[5rem] leading-tight text-orangeColor font-bold font-dancingScript m-0">
              {title}
            </h3>
            <p className="text-[1.6rem] text-white break-words">{desc}</p>
            <div>
              <button
                className="text-white bg-orangeColor py-[1rem] px-[2rem] rounded-[.5rem] text-center text-[1.6rem]"
                onClick={() => navigate(`/product/${id}`)}
              >
                Xem chi tiết
              </button>
            </div>
          </div>
          <div className="relative w-[50%] aspect-video rounded-[.5rem] overflow-hidden after:content-['']  after:w-full after:h-full after:absolute after:top-0 after:left-0 after:animate-floatLeft">
            <img src={background} alt={title} className="w-full h-full object-cover" />
          </div>
        </div>
      </Wrapper>
    </div>
  )
}

export default Slider
