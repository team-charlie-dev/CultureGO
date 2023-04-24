import React from 'react'

export default function TagCard({image, text, position}) {
  return (
    <div style = {{backgroundImage: `url(${image})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: `${position}`}}
    className='flex items-center justify-center bg-primary border-primary'>
      <p className='text-center bg-black bg-opacity-40 text-white cneter w-full'>{text}</p>
    </div>
  )
}
