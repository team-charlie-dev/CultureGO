import React, {useState} from 'react'
import Button from '../../Components/buttons/button'
import ProfileIcon from '../../Components/icons/ProfileIcon'
import UserTermsIcon from '../../Components/icons/UserTermsIcon'
import LogoutIcon from '../../Components/icons/LogoutIcon'
import AchievementsIcon from '../../Components/icons/AchievementsIcon'
import LogoLarge from "../../Components/icons/LogoLarge"
import Moreinfo from './moreinfo'
export default function Settings() {
  
  const [data, setData] = useState({
    showMoreInfo: false,
    info: '',
    type: ''
  })
    return   (
      <div>
        <div className="bg-white h-screen m-auto w-screen max-w-md">
        
          <div className="h-1/3 ">
            <div className="flex flex-col justify-center h-full">  
              <div className="flex flex-row justify-center">
                      <LogoLarge/>
              </div>
            </div>
          
          </div>
          <div className='items-center flex flex-col h-1/2 justify-between relative'>
            <Moreinfo data={data} />

            <Button clickHandler={()=>setData({showMoreInfo: true, info: 'about info', type:'about'})} text="About Me" icon={ProfileIcon} size="large"></Button>
            <Button clickHandler={()=>setData({showMoreInfo: true, info: 'achievements info', type:'achievements'})} text="Achievements" icon={AchievementsIcon} size="large"></Button>
            <Button clickHandler={()=>setData({showMoreInfo: true, info: 'user terms info', type:'terms'})} text="User Terms" icon={UserTermsIcon} size="large"></Button>
            <Button text="Logout" icon={LogoutIcon} size="large"></Button>

          </div>
        </div>
      </div>
    )
    
  
}
