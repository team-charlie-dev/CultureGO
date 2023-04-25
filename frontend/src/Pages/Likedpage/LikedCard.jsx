import LocationPin from "../../Components/icons/LocationPin.svg";
import CheckboxButton from "../../Components/buttons/CheckboxButton";

import {useContext} from 'react'

import {deleteContext} from './DeleteContext'

const LikedCard = ({name, location, img, callbackFunc}) => {
    var del = useContext(deleteContext)

    return (
        <div style={{backgroundColor: 'red'}} className="rounded-xl relative mt-2">
            <div className="absolute left-2 top-12">
                
                <CheckboxButton clickHandler={callbackFunc}/>

            </div>

            <div style={{backgroundImage: `url(${img}`, backgroundSize: 'cover', backgroundPosition: 'center',
                transform: `translate(${del ? 70 : 0}px, 0)`, transition: 'transform 300ms ease-in-out'}} 
                className="w-full rounded-lg pt-12  text-white">
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