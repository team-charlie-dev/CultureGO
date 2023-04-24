import React from 'react'
import Outdoor from '../../Components/icons/tag-page-icons/Outdoor.svg'
import Indoor from '../../Components/icons/tag-page-icons/Indoor.svg'
import Free from '../../Components/icons/tag-page-icons/Free.svg'
import Random from '../../Components/icons/tag-page-icons/Random.svg'
import TagCard from './TagCard'

export default function Tags() {
  return (
    <div className='grid grid-cols-2 h-screen'>
          <p className='absolute bg-white'>What mood are you in?</p>
          <TagCard image={Outdoor} text = "Outdoor"/>
          <TagCard image={Indoor} text = "Indoor"/>
          <TagCard image={Free} text = "Free"/>
          <TagCard image={Random} text = "Random"/>
    </div>
  )
}

