import React from 'react'
import Outdoor from '../../Components/icons/tag-page-icons/Outdoor.svg'
import Indoor from '../../Components/icons/tag-page-icons/Indoor.svg'
import Free from '../../Components/icons/tag-page-icons/Free.svg'
import Random from '../../Components/icons/tag-page-icons/Random.svg'
import TagCard from './TagCard'

export default function Tags() {
  return (
    <div>
      <p className='bg-white text-center relative top-28 '>What mood are you in?</p>
      <div className='grid grid-cols-2 h-screen'>
          <TagCard image={Outdoor} text = "Outdoor" position = 'right'/>
          <TagCard image={Indoor} text = "Indoor" position = 'left'/>
          <TagCard image={Free} text = "Free" position = 'right'/>
          <TagCard image={Random} text = "Random" position = 'left'/>
      </div>
    </div>
  )
}

