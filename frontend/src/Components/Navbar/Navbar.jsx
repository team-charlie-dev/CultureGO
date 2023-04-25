import React from 'react'
import HomeButton from './HomeButton'
import LikeButton from './LikeButton'
import TagButton from './TagButton'
import SettingsButton from './SettingsButton'

export default function Navbar(props) {
    const {children} = props
    const {state:[currentPage, setCurrentPage]} = props

    const handleClick = (page) => {
        console.log(page)
    }
    return (
        <>
            <div className="absolute w-full bg-primary bottom-0 z-20 shadow-[0_35px_60px_-15px_rgba(0,0,0,1)]">
                <div className='flex justify-around p-3'>
                    <HomeButton state={[currentPage, setCurrentPage]}/>
                    <LikeButton state={[currentPage, setCurrentPage]}/>
                    <TagButton state={[currentPage, setCurrentPage]}/>
                    <SettingsButton state={[currentPage, setCurrentPage]}/>
                </div>
            </div>
            {children}
        </>
    );
}