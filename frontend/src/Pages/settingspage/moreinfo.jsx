import React from 'react'

export default function Moreinfo({data: {showMoreInfo, info, type}}) {
    return (
        <div className='absolute w-full h-full bg-secondaryLight z-10 ' style={{bottom: '-00%', display: showMoreInfo?'block':'none'}}>
        
            {
                type === 'about' ? 
                    <div>about</div>: 
                    (type === 'achievements'?
                    <div>achievements</div>:
                        (type === 'terms'?
                         <div>terms</div>: <div>error</div>)
                    )
            }
        
        </div>
    )
    
  }
