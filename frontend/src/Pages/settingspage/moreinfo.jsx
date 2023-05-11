import React from 'react'
import About from './about'
import Achievements from './acknoweledgements'
import Terms from './terms'
import ArrowDownIcon from '../../Components/icons/ArrowDownIcon'

export default function Moreinfo({dataState}) {
    const [data, setData] = dataState
    return (
        <div 
            id='moreinfo' 
            className='absolute w-5/6 rounded-2xl h-3/5 bg-primaryDark z-10 ' 
            style={{
                bottom: data.showMoreInfo?'10%':'-200%', 
                transition: 'all 0.2s ease-in-out',
                left: '50%',
                transform: 'translate(-50%, 0%)'
            }} >
        
            {
                data.type === 'about' ? 
                    <About info={{username: data.info.username, user_id:data.info.user_id}} />: 
                    (data.type === 'Acknowledgements'?
                    <Achievements info={'Acknowledgements here'}/>:
                        (data.type === 'terms'?
                         <Terms info='aslfdjlaksjf' />: <div></div>)
                    )
            }
            <div 
                className='absolute left-1/2 -translate-x-1/2 bottom-3 rounded-full bg-primaryDark p-2 shadow-md'
                onClick={()=>setData({showMoreInfo: false,info: '',type: ''})}>
                    <ArrowDownIcon/>
            </div>
        
        </div>
    )
    
  }
