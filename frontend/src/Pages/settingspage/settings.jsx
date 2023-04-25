import React, {useEffect, useState} from 'react'
import Button from '../../Components/buttons/button'
import ProfileIcon from '../../Components/icons/ProfileIcon'
import UserTermsIcon from '../../Components/icons/UserTermsIcon'
import LogoutIcon from '../../Components/icons/LogoutIcon'
import AchievementsIcon from '../../Components/icons/AchievementsIcon'
import LogoLarge from "../../Components/icons/LogoLarge"
import Moreinfo from './moreinfo'
export default function Settings() {

  const userID = 'c1cdc408-853d-44b6-a236-f5c046bea6a1'

  const [data, setData] = useState({
    showMoreInfo: false,
    info: '',
    type: ''
  })

  const fetchUserData = async (userId)=>{
    const featchedData = await fetch(`http://localhost:4000/getuser?userid=${userId}`)
    
    return featchedData.json()
  }

  const handleClick = async (type)=>{

  }
    return   (
        <div className="bg-white h-full w-full">
        
          <div className="h-1/3 ">
            <div className="flex flex-col justify-center h-full">  
              <div className="flex flex-row justify-center">
                      <LogoLarge/>
              </div>
            </div>
          
          </div>
          <Moreinfo dataState={[data, setData]} />
          <div className='items-center flex flex-col h-1/2 justify-between relative' style={{opacity: data.showMoreInfo? 0:1 ,transition: 'all 0.2s ease-in-out'}}>
            <Button clickHandler={async()=>setData({showMoreInfo: true, info: (await fetchUserData(userID)), type:'about'})} text="About Me" icon={ProfileIcon} size="large"></Button>
            <Button clickHandler={()=>setData({showMoreInfo: true, info: 'achievements info', type:'achievements'})} text="Achievements" icon={AchievementsIcon} size="large"></Button>
            <Button clickHandler={()=>setData({showMoreInfo: true, info: 'user terms info', type:'terms'})} text="User Terms" icon={UserTermsIcon} size="large"></Button>
            <Button text="Logout" icon={LogoutIcon} size="large"></Button>
            

          </div>
        </div>
    )
    
  
}
