import React from 'react'
import Outdoor from '../../Components/icons/tag-page-icons/Outdoor'
export default function Tags() {
  return (
    <div className='flex flex-row'>
        <div className='flex flex-col'>
            <div>Tag 1
              <Outdoor/>
            </div>
            <div>Tag 2</div>
        </div>
        <div className='flex flex-col   '>
            <div>Tag 3</div>
            <div>Tag 4</div>
        </div>
    </div>
  )
}

