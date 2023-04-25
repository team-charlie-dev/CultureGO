import React from 'react'
import About from './about'
import Achievements from './achievements'
import Terms from './terms'

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
            }} 
            onClick={()=>setData({showMoreInfo: false,info: '',type: ''})}>
        
            {
                data.type === 'about' ? 
                    <About info={{name: 'Reza', email:'Reza@kth.se'}} />: 
                    (data.type === 'achievements'?
                    <Achievements info={'Lots of achievements'}/>:
                        (data.type === 'terms'?
                         <Terms info='aslfdjlaksjf' />: <div></div>)
                    )
            }
        
        </div>
    )
    
  }
