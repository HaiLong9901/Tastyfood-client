import React from 'react'
import { GiCakeSlice } from 'react-icons/gi'

function Title({ title }) {
  return (
    <div className="px-[2rem] py-[1rem] flex gap-[2rem] items-center border-y-[.1rem] border-y-secondaryColor border-y-solid">
      <GiCakeSlice className="text-[2rem] text-secondaryColor" />
      <h2 className="text-secondaryColor capitalize text-[3rem] font-bold font-dancingScript">{title}</h2>
      <GiCakeSlice className="text-[2rem] text-secondaryColor" />
    </div>
  )
}

export default Title
