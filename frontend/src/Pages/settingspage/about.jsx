import React from 'react'
import ProfileIcon from '../../Components/icons/ProfileIcon'

export default function About({info:{username, user_id}}) {
  return (
    <div className='w-full h-full flex flex-col text-white text-l font-bold p-7'>
        <div className='text-center text-xl'>About Me</div>
        <div>
            <ProfileIcon/>
        </div>
        <div>
            Username: {username}
        </div>
        <div>
            User ID: {user_id}
        </div>
    </div>
  )
}
