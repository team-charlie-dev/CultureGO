import React from 'react'

import Walleticon from "../../Components/icons/WalletIcon"
import LocationIcon from "../../Components/icons/LocationIcon"
import Clockicon from "../../Components/icons/ClockIcon"
import Arrow from "../../Components/icons/Arrow";

const Image = ({ imgUrl, mode}) => {

    const imgPlaceholder = "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg"

    return (
        <div className="h-full">
            <img id={mode} alt={imgUrl} src={imgUrl || imgPlaceholder} className="rounded-b-[30px] object-cover h-full"></img>
        </div>
    );
};

const InfoBox = ({ name, info, shortPrice, openHoursToday, location, arrowClickHandler }) => {
    return (
        <div className="items-center bg-infoColor rounded-[30px] p-3 text-white backdrop-blur-[2px] bg-opacity-30">
            <h1 className="italic text-2xl px-5 font-bold text-sh" style={{ textShadow: '1px 1px 5px rgba(0,0,0, 0.7)' }}>{name}</h1>
            <p className="text-base p-5 text-sh" style={{ textShadow: '2px 2px 5px rgba(0,0,0, 1)' }}>{info} </p>
            <div className="flex justify-between px-5 items-center">
                <div className="grid grid-cols-2 w-2/3">
                    <div className="flex">
                        <Clockicon />
                        <p className="text-sh" style={{ textShadow: '2px 2px 5px rgba(0,0,0, 1)' }}>{openHoursToday || '-'}</p>
                    </div>
                    <div className="flex">
                        <LocationIcon />
                        <p className="text-sh" style={{ textShadow: '2px 2px 5px rgba(0,0,0, 1)' }}>{location || '-'}</p>
                    </div>
                    <div className="flex">
                        <Walleticon />
                        <p className="text-sh" style={{ textShadow: '2px 2px 5px rgba(0,0,0, 1)' }}>{shortPrice == null ? '-' : shortPrice}</p>
                    </div>

                </div>
                <div onClick={arrowClickHandler}>
                    <Arrow />
                </div>
            </div>
        </div>
    );
};

export default function Card({currentImage, setCurrentImage, itemData, mode, arrowClickHandler}) {
    const handleImageChange = (side) => {
        if (side === "left") {
            if (currentImage === 0) {
                setCurrentImage(itemData.images.length - 1)
            } else {
                setCurrentImage(currentImage - 1)
            }
        } else if (side === "right") {
            if (currentImage === itemData.images.length - 1) {
                setCurrentImage(0)
            } else {
                setCurrentImage(currentImage + 1)
            }
        }
    }

    return (
        <div className="relative h-[85%] w-auto font-inriaSans px-3">
            <div className="w-full h-full absolute flex">
                <div className="w-1/2 h-full relative" onClick={() => handleImageChange('left')}></div>
                <div className="w-1/2 h-full relative" onClick={() => handleImageChange('right')}></div>
            </div>
            <div
                style={{
                    backgroundImage:
                        "linear-gradient(to top, rgba(255,255,255,0), rgba(255,255,255,1))",
                    position: "absolute",
                    width: "100%",
                    height: "10%",
                }}
            ></div>
            <Image mode = {mode} imgUrl={itemData.images[currentImage]} />
            <div className="absolute bottom-0 left-0 right-0 px-3">
                <InfoBox name={itemData.name} info={itemData.shortInfo} shortPrice={itemData.shortPrice} openHoursToday={itemData.openHoursToday} location={itemData.location} arrowClickHandler={arrowClickHandler}/>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex gap-x-5">
                {itemData.images.map((image, index) => {
                    return <div
                        className={`${index === currentImage ? 'bg-primaryDark' : 'bg-white'} rounded-full w-3 h-3`}
                        key={image}
                        onClick={() => setCurrentImage(index)}
                    />
                })}

            </div>
        </div>
    )
}
