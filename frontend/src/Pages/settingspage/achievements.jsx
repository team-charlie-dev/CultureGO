import React from 'react'

export default function Achievements({info}) {
  return (
    <div className='w-full h-full flex flex-col text-white text-xl font-bold p-7'>
        
        <div>
            Achievements: {info}
        </div>
    </div>
  )
}
