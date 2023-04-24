import React from 'react'
import Button from '../../Components/buttons/button'
import ProfileIcon from '../../Components/icons/ProfileIcon'
import UserTermsIcon from '../../Components/icons/UserTermsIcon'
import LogoutIcon from '../../Components/icons/LogoutIcon'
import AchievementsIcon from '../../Components/icons/AchievementsIcon'
import LogoLarge from "../../Components/icons/LogoLarge"
export default function settings() {
  return (
    <div className="bg-white h-screen m-auto w-screen max-w-md">
        <div className="h-1/3 ">

          <div className="flex flex-col justify-center h-full">  
            <div className="flex flex-row justify-center">
                    <LogoLarge/>
            </div>
          </div>
        
        </div>
        <div className='items-center flex flex-col h-1/2 justify-between'>
          <Button text="About me" icon={ProfileIcon} size="large"></Button>
          <Button text="Achievements" icon={AchievementsIcon} size="large"></Button>
          <Button text="User Terms" icon={UserTermsIcon} size="large"></Button>
          <Button text="Logout" icon={LogoutIcon} size="large"></Button>

        </div>

    </div>
  )
}
