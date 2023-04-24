import React from 'react'

export default function TagCard({image, text}) {
  return (
    <div style = {{backgroundImage: `url(${image})`, backgroundSize: 'cover'}}
    className='w-16 h-24'>
      <p className='text-center bg-black bg-opacity-40 text-white'>{text}</p>
    </div>
  )
}
