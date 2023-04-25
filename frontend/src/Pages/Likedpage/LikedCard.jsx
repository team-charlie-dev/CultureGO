import LocationPin from "../../Components/icons/LocationPin.svg";
import CheckboxButton from "../../Components/buttons/CheckboxButton";

import {useContext} from 'react'

import {deleteContext} from './DeleteContext'

const LikedCard = ({name, location, img, callbackFunc}) => {
    var del = useContext(deleteContext)

    return (
        <div  className="rounded-2xl relative mt-2 bg-primaryDark">
            <div className="absolute left-2 top-12">
                
                <CheckboxButton clickHandler={callbackFunc}/>

            </div>

            <div style={{backgroundImage: `url(${img}`, backgroundSize: 'cover', backgroundPosition: 'center',
                transform: `translate(${del ? 70 : 0}px, 0)`, transition: 'transform 300ms ease-in-out'}} 
                className="w-full rounded-xl pt-12 pb-12 text-white">
                <div className=" pt-2 pb-2 bg-black w-full text-center bg-opacity-20 rounded-2xl">
                    <p style={{textShadow: '1px 1px 5px black'}}><i>{name}</i></p>
                </div>
                
                <div className=" absolute left-0 bottom-0 flex">
                    <img src={LocationPin} alt=""/>
                    <p style={{textShadow: '1px 1px 5px black'}}>{location}</p>
                </div>
            </div>
        </div>

    )
}

export default LikedCard