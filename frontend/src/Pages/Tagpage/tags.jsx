import React from 'react'
import Outdoor from '../../Components/icons/tag-page-icons/Outdoor.svg'
import Indoor from '../../Components/icons/tag-page-icons/Indoor.svg'
import Free from '../../Components/icons/tag-page-icons/Free.svg'
import Random from '../../Components/icons/tag-page-icons/Random.svg'
export default function Tags() {
  return (
    <div className='flex flex-row'>
      <div className='flex flex-col'>
        <div>
          <img src={Outdoor} />
        </div>
        <div>
          <img src={Indoor} />
        </div>
      </div>
      <div className='flex flex-col   '>
        <div>
          <img src={Free} />
        </div>
        <div>
          <img src={Random} />
        </div>
      </div>
    </div>
  )
}

