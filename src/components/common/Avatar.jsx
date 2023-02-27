import React from 'react'

function Avatar({ src, alt }) {
  return (
    <div className="w-[3rem] h-[3rem] rounded-[5rem] overflow-hidden">
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  )
}

export default Avatar
