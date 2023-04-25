import LocationPin from "../../Components/icons/LocationPin.svg";

import {useContext} from 'react'

import {deleteContext} from './DeleteContext'

const LikedCard = ({name, location, img, callbackFunc}) => {

    var del = useContext(deleteContext)

    const deleteFunc = (e) => callbackFunc(e.target.checked)

    return (
        <div style={{backgroundColor: 'red'}} className="rounded-xl relative">

            <input type="checkbox" className="absolute left-2 top-5"  
                onChange={deleteFunc}></input>

            <div style={{backgroundImage: `url(${img}`, backgroundSize: 'cover', transform: `translate(${del ? 100 : 0}px, 0)`, transition: 'transform 300ms ease-in-out'}} 
                className="w-full rounded-lg pt-12 mt-2  text-white">
                <div className=" pt-2 pb-12 bg-black w-full text-center bg-opacity-20 rounded-lg ">
                    {name}
                </div>
                
                <div className=" absolute left-0 bottom-0 flex">
                    <img src={LocationPin} alt=""/>
                    {location}
                </div>
            </div>
        </div>

    )
}

export default LikedCard