import React from 'react'

export default function TagCard({image, text}) {
  return (
    <div style = {{backgroundImage: `url(${image})`, backgroundSize: 'cover'}}
    className='w-16 h-24 flex items-center justify-center'>
      <p className='text-center bg-black bg-opacity-40 text-white w-full'>{text}</p>
    </div>
  )
}
