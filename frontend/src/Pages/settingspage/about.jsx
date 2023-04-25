import React from 'react'
import ProfileIcon from '../../Components/icons/ProfileIcon'

export default function About({info}) {
  return (
    <div className='w-full h-full flex flex-col text-white text-l font-bold p-7'>
        <div className='text-center text-xl'>About Me</div>
        <div>
            <ProfileIcon/>
        </div>
        <div>
            Username: {info.username}
        </div>
        <div>
            User ID: {info.user_id}
        </div>
    </div>
  )
}
