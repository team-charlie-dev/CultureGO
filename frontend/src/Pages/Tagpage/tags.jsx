import React from 'react'
import Outdoor from '../../Components/icons/tag-page-icons/Outdoor.png'
import Indoor from '../../Components/icons/tag-page-icons/Indoor.png'
import Free from '../../Components/icons/tag-page-icons/Free.png'
import Random from '../../Components/icons/tag-page-icons/Random.png'
import TagCard from './TagCard'

export default function Tags() {
  return (
    <div className='h-[calc(100%-var(--navbar-height))]'>
      <div className='grid grid-cols-2 h-full bg-black'>
        <TagCard image={Outdoor} text="Outdoor" xPosition='right' yPosition='bottom' />
        <TagCard image={Indoor} text="Indoor" xPosition='left' yPosition='bottom' />
        <TagCard image={Free} text="Free" xPosition='right' yPosition='top' />
        <TagCard image={Random} text="Random" xPosition='left' yPosition='top' />
      </div>
      <div className = 'flex justify-center'>
        <p className='bg-white text-center absolute top-[10%] px-[15%] font-inriaSans'>What mood are you in?</p>
        <button className = 'absolute bottom-[12%] text-white font-inriaSans text-xs italic bg-primaryDark px-[10%] py-[2%] rounded-full'>
        Done
      </button>
      </div>
    </div>
  )
}