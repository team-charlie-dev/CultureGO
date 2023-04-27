import GoBack from "../icons/GoBack";
// import Arrow from "../icons/Arrow";
import ClockIcon from "../icons/ClockIcon";
import WalletIcon from "../icons/WalletIcon";
import LocationIcon from "../icons/LocationIcon";
import { useState } from "react";

const Image = ( {data} ) => {
    const [id, pics] = data;
    
    let img =
    `https://iynsfqmubcvdoqicgqlv.supabase.co/storage/v1/object/public/team-charlie-storage/sights/${id}/1.jpg`;
    return (
        <div className="h-full">
            <img src={img} className=" h-full object-cover "></img>
        </div>
    );
};

const InfoBox = ( {data} ) => {
    console.log(data)

    return (
        <>
            <h1 className="italic text-[24px] font-semibold m-3">{data}</h1>
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
        </>
    );
};

// fetches the missing info for extended info page
function getMoreInfo () {
    // if true, get TimeInfo and PriceInfo as well

    // call getInfo

    // parse response json
    // return string with longInfo
}

export default function FullCard({infoState}) {

    const [infoCard, setInfoCard] = infoState;

    var id = infoCard.id
    var pics = infoCard.nmbrOfPics
    var name = infoCard.name

    return (
        /* Card body */
        <div className=" z-30 w-full h-full bg-opacity-0 font-inriaSans ">
            <div className=" relative h-[calc(100vh-var(--navbar-height)-5rem)] ">
                <Image data={[id, pics]} />
                <div className="items-center mx-3 rounded-[30px] p-3 text-white bg-infoColor backdrop-blur-[2px] bg-opacity-30 absolute bottom-6 left-0 right-0 max-h-[40%] overflow-scroll overflow-x-hidden ">
                    <InfoBox data={name}/>
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