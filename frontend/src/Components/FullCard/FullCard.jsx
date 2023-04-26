import GoBack from "../icons/GoBack";
// import Arrow from "../icons/Arrow";
import ClockIcon from "../icons/ClockIcon";
import WalletIcon from "../icons/WalletIcon";
import LocationIcon from "../icons/LocationIcon";
import { useState } from "react";

const Image = () => {
    let img =
        "https://www.city-guide-stockholm.com/_bibli/annonces/455/hd/abba-museum-03.jpg";
    return (
        <div className="h-full">
            <img src={img} className="object-none h-full"></img>
        </div>
    );
};

const InfoBox = () => {
    return (
        <div className="items-center rounded-[30px] p-3 text-white bg-infoColor backdrop-blur-[2px] bg-opacity-30">
            <h1 className="italic text-[24px] font-semibold m-3">Abba The Museum</h1>
            <p className="text-[16px]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit eligendi
                unde facilis officia ad temporibus. Molestias beatae expedita,
                doloremque consequuntur, voluptatum nesciunt reprehenderit eius enim
                labore, modi assumenda perspiciatis obcaecati?

                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit eligendi
                unde facilis officia ad temporibus. Molestias beatae expedita,
                doloremque consequuntur, voluptatum nesciunt reprehenderit eius enim
                labore, modi assumenda perspiciatis obcaecati?
            </p>
            {/* Opening hours, price and location */}
            <div className="mt-5 flex justify-evenly">
                <div className=" flex flex-row ">
                    <ClockIcon />
                    <p className="ml-2">9-23</p>
                </div>
                
                <div className=" flex flex-row ">
                    <LocationIcon />
                    <p className="ml-2">Stockholm</p>
                </div>
                <div className=" flex flex-row ">
                    <WalletIcon />
                    <p className="ml-2">Gratis</p>
                </div>
                
            </div>
            {/*
            <div className="flex justify-end">
                <Arrow />
            </div>
            */}
        </div>
    );
};

export default function FullCard({infoState}) {

    console.log(infoState)

    const [infoCard, setInfoCard] = infoState;

    console.log(infoCard.id)

    return (
        /* Card body */
        <div className=" z-30 w-full h-full bg-opacity-0 font-inriaSans ">
            <div className=" relative h-[calc(100vh-var(--navbar-height)-5rem)] ">
                <Image />
                <div className=" absolute bottom-6 left-0 right-0 p-3">
                    <InfoBox />
                </div>
            </div>           
            
            {/* back bar */}
            <div className=" absolute flex h-[var(--navbar-height)] justify-center w-full bg-primary z-30 bottom-0 shadow-[0_35px_60px_-15px_rgba(0,0,0,1)]">
                {/* back button div    // I ONCLICK: () => setInfo( { showMoreInfo: false } ) */}
                <div className=" mt-3 cursor-pointer" onClick={() => setInfoCard( {show: false, id: ""} ) }>
                    <GoBack />
                </div>
            </div>
        </div>
    )
}