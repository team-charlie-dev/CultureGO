import React, { useState } from 'react'

export default function TagCard({ image, text, xPosition, yPosition }) {
  const [clicked, changeClicked] = useState(false)

  function handleClick() {
    changeClicked(clicked => !clicked)
  }

  const clickedStyle = 'opacity-50 scale-[1.4]' 

  return (
    <div className = 'overflow-hidden' onClick={handleClick}>
      <div style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPositionX: `${xPosition}`, backgroundPositionY: `${yPosition}` }}
        className={`transition-all duration-500 w-full h-full ${clicked ? clickedStyle : ''}`}>
      </div>
      <p className={`text-center transition-all duration-500 bg-opacity-50 text-white w-full ${clicked ? '' : 'bg-black'} relative bottom-1/2 font-inriaSans italic`}>{text}</p>
    </div>
  )
}

