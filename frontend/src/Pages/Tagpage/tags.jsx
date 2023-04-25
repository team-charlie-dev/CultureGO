import React from 'react'
import Outdoor from '../../Components/icons/tag-page-icons/Outdoor.svg'
import Indoor from '../../Components/icons/tag-page-icons/Indoor.svg'
import Free from '../../Components/icons/tag-page-icons/Free.svg'
import Random from '../../Components/icons/tag-page-icons/Random.svg'
import TagCard from './TagCard'

export default function Tags() {
  return (
    <div>
      <div className='grid grid-cols-2 h-screen bg-black'>
        <TagCard image={Outdoor} text="Outdoor" xPosition='right' yPosition='bottom' />
        <TagCard image={Indoor} text="Indoor" xPosition='left' yPosition='bottom' />
        <TagCard image={Free} text="Free" xPosition='right' yPosition='top' />
        <TagCard image={Random} text="Random" xPosition='left' yPosition='top' />
        <p className='bg-white text-center absolute top-28 w-full font-inriaSans'>What mood are you in?</p>
      </div>
    </div>
  )
}

