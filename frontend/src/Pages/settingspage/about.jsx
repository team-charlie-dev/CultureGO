import React from 'react'
import ProfileIcon from '../../Components/icons/ProfileIcon'

export default function About({info}) {
  return (
    <div className='w-full h-full flex flex-col text-white text-l font-bold p-7'>
        <div className='text-center text-xl'> Om mig </div>
        <div>
            <ProfileIcon/>
        </div>
        <div>
            Användarnamn: {info.username}
        </div>
        <div>
            Användar-id: {info.user_id}
        </div>
    </div>
  )
}
