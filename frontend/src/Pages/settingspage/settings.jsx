import React from 'react'
import Button from '../../Components/buttons/button'
import ProfileIcon from '../../Components/icons/ProfileIcon'
import UserTermsIcon from '../../Components/icons/UserTermsIcon'
import LogoutIcon from '../../Components/icons/LogoutIcon'
import AchievementsIcon from '../../Components/icons/AchievementsIcon'
export default function settings() {
  return (
    <div className="bg-white h-screen m-auto w-screen max-w-md">
        <div>header</div>
        <div className=''>
          <Button text="About me" icon={ProfileIcon} size="large"></Button>
          <Button text="Achievements" icon={AchievementsIcon} size="large"></Button>
          <Button text="User Terms" icon={UserTermsIcon} size="large"></Button>
          <Button text="Logout" icon={LogoutIcon} size="large"></Button>

        </div>

    </div>
  )
}
