import React, { useEffect, useState } from 'react'
import Outdoor from '../../Components/icons/tag-page-icons/Outdoor.png'
import Indoor from '../../Components/icons/tag-page-icons/Indoor.png'
import Free from '../../Components/icons/tag-page-icons/Free.png'
import Random from '../../Components/icons/tag-page-icons/Random.png'
import TagCard from './TagCard'
import serverUrl from '../../address'

export default function Tags({ changeScreen, setIsLoggedin }) {
  //Outdoor = 0, Indoor = 1, Free = 2, Random = 3

  const [clicked, changeClicked] = useState(new Array(4))
  const [doneClicked, changeDoneClicked] = useState(false)
  let prevState = new Array(4)

  useEffect(() => {
    const getFilters = async () => {
      const response = await fetch(`${serverUrl}/getfilters?userId=${localStorage.getItem('user_id')}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem('token')
        }
      })
      const data = await response.json()
      console.log(data)
      changeClicked([data.outdoor, data.indoor, data.free, data.random])
      prevState = [data.outdoor, data.indoor, data.free, data.random]
    }
    getFilters();
  }, [])
  
  
  function handleClick(index) {
    const newClicked = clicked.slice()
    newClicked[index] = !newClicked[index]
    if (newClicked[0] !== prevState[0] || newClicked[1] !== prevState[1] || newClicked[2] !== prevState[2] || newClicked[3] !== prevState[3]) {
      changeDoneClicked(true)
    }
    else {
      changeDoneClicked(false)
    }
    changeClicked(newClicked)
  }

  function handleClickDone() {
    const [outdoor, indoor, free, random] = clicked
    fetch(`http://localhost:4000/tags?userId=${localStorage.getItem('user_id')}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'x-access-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ outdoor, indoor, free, random })
    })
      .then(res => {
        if (res.status == 403) {
          setIsLoggedin(false)
        }
      })

    changeScreen('home')
  }

  return (
    <div className='h-[calc(100%-var(--navbar-height))]'>
      <div className='grid grid-cols-2 h-full bg-black'>
        <TagCard image={Outdoor} text="Outdoor" xPosition='right' yPosition='bottom' clicked={clicked[0]} handleClick={() => handleClick(0)} />
        <TagCard image={Indoor} text="Indoor" xPosition='left' yPosition='bottom' clicked={clicked[1]} handleClick={() => handleClick(1)} />
        <TagCard image={Free} text="Free" xPosition='right' yPosition='top' clicked={clicked[2]} handleClick={() => handleClick(2)} />
        <TagCard image={Random} text="Random" xPosition='left' yPosition='top' clicked={clicked[3]} handleClick={() => handleClick(3)} />
      </div>
      <div className='flex justify-center'>
        <p className='bg-white text-center absolute top-[10%] px-[15%] font-inriaSans'>What mood are you in?</p>
        <button onClick={handleClickDone} className={`absolute text-white font-inriaSans text-xs italic bg-primaryDark px-[10%] py-[2%] rounded-full transition-all duration-500 ${doneClicked ? 'bottom-[12%]' : 'bottom-[0%]'}`}>
          Done
        </button>
      </div>
    </div>
  )
}