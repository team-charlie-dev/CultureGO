import React from 'react'

export default function TagCard({image, text}) {
  return (
    <div style = {{backgroundImage: `url(${image})`, backgroundSize: '100%', backgroundRepeat: 'no-repeat'}}
    className='flex items-center justify-center w-16 h-24'>
      <p className='text-center bg-black bg-opacity-40 text-white cneter w-full'>{text}</p>
    </div>
  )
}
