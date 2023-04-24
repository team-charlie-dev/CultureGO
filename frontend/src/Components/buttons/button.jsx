import React from 'react'

export default function button({text, icon, size}) {
    if(size === 'large'){
        return (
            <div className='bg-primaryDark rounded-2xl h-16 w-5/6 text-center flex justify-around px-16 text-white font-bold italic relative text-lg'>
                <div className='h-full'>
                    {icon()}
                </div>
                <div className='m-auto'>
                    {text}
                </div>
            </div>
        )
    }
    else if(size === 'small'){
        return(
            <div className='bg-primaryDark h-6 w-44 m-6 text-center flex justify-around px-16 text-white font-bold relative text-base'>
                <div className='h-full'>
                    {icon()}
                </div>
                <div className='m-auto'>
                    {text}
                </div>
            </div>
        )
    }
}
