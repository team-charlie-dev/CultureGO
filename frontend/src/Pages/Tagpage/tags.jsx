import React, { useState } from 'react'
import Outdoor from '../../Components/icons/tag-page-icons/Outdoor.png'
import Indoor from '../../Components/icons/tag-page-icons/Indoor.png'
import Free from '../../Components/icons/tag-page-icons/Free.png'
import Random from '../../Components/icons/tag-page-icons/Random.png'
import TagCard from './TagCard'

export default function Tags() {
  const [clicked, changeClicked] = useState([false, false, false, false, false])
  
  function handleClick(index) {
    const newClicked = clicked.slice()
    newClicked[index] = !newClicked[index]
    if (newClicked[0] !== false || newClicked[1] !== false || newClicked[2] !== false || newClicked[3] !== false)
    {
      newClicked[4] = true
    }
    else
    {
      newClicked[4] = false
    }
    changeClicked(newClicked)
  }

  return (
    <div className='h-[calc(100%-var(--navbar-height))]'>
      <div className='grid grid-cols-2 h-full bg-black'>
        <TagCard image={Outdoor} text="Outdoor" xPosition='right' yPosition='bottom' clicked = {clicked[0]} handleClick={() => handleClick(0)}/>
        <TagCard image={Indoor} text="Indoor" xPosition='left' yPosition='bottom' clicked = {clicked[1]} handleClick={() => handleClick(1)}/>
        <TagCard image={Free} text="Free" xPosition='right' yPosition='top' clicked = {clicked[2]} handleClick={() => handleClick(2)}/>
        <TagCard image={Random} text="Random" xPosition='left' yPosition='top' clicked = {clicked[3]} handleClick={() => handleClick(3)}/>
      </div>
      <div className='flex justify-center'>
        <p className='bg-white text-center absolute top-[10%] px-[15%] font-inriaSans'>What mood are you in?</p>
        <button className={`absolute text-white font-inriaSans text-xs italic bg-primaryDark px-[10%] py-[2%] rounded-full transition-all duration-500 ${clicked[4] ? 'bottom-[12%]' : 'bottom-[0%]'}`}>
          Done
        </button>
      </div>
    </div>
  )
}