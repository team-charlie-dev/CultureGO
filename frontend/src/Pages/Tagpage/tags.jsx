import React from 'react'
import Outdoor from '../../Components/icons/tag-page-icons/Outdoor.svg'
import Indoor from '../../Components/icons/tag-page-icons/Indoor.svg'
import Free from '../../Components/icons/tag-page-icons/Free.svg'
import Random from '../../Components/icons/tag-page-icons/Random.svg'
import TagCard from './TagCard'

export default function Tags() {
  return (
    <div className='flex flex-row'>
      <div className='flex flex-col'>
        <div>
          <TagCard image={Outdoor} text = "Outdoor"/>
        </div>
        <div>
          <TagCard image={Indoor} text = "Indoor"/>
        </div>
      </div>
      <div className='flex flex-col   '>
        <div>
          <TagCard image={Free} text = "Free"/>
        </div>
        <div>
          <TagCard image={Random} text = "Random"/>
        </div>
      </div>
    </div>
  )
}

