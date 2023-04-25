import React, { useState } from 'react'

export default function TagCard({ image, text, xPosition, yPosition }) {
  const [clicked, changeClicked] = useState('opacity-100')

  function handleClick() {
    changeClicked('opacity-50')
  }

  return (
    <div onClick={handleClick}>
      <div style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPositionX: `${xPosition}`, backgroundPositionY: `${yPosition}` }}
        className={`bg-primary hover:opacity-50 transition-all w-full h-full ${clicked}`}>
      </div>
      <p className='text-center bg-black bg-opacity-50 text-white w-full relative bottom-1/2 font-inriaSans italic'>{text}</p>
    </div>
  )
}

