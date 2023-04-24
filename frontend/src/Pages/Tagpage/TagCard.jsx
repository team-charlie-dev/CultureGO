import React from 'react'

export default function TagCard({image, text, xPosition, yPosition}) {
  return (
    <div style = {{backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPositionX: `${xPosition}`, backgroundPositionY: `${yPosition}`}}
    className='flex items-center justify-center bg-primary border-primary'>
      <p className='text-center bg-black bg-opacity-40 text-white w-full'>{text}</p>
    </div>
  )
}

