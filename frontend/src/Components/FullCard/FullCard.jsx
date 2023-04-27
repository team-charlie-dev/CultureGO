import GoBack from "../icons/GoBack";
// import Arrow from "../icons/Arrow";
import ClockIcon from "../icons/ClockIcon";
import WalletIcon from "../icons/WalletIcon";
import LocationIcon from "../icons/LocationIcon";
import { useEffect, useState } from "react";

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
    const [name, moreInfo] = data

    return (
        <>
            <h1 className="italic text-[24px] font-semibold m-3">{name}</h1>
            <p className="text-[16px]">
                {moreInfo.longInfo}
            </p>
            {/* Opening hours, price and location */}
            <div className="mt-5 flex justify-evenly">
                <div className=" flex flex-row ">
                    <ClockIcon />
                    <p className="ml-2">{/*moreInfo.openHours[0]*/}13 - 37</p>
                </div>
                
                <div className=" flex flex-row ">
                    <LocationIcon />
                    <p className="ml-2">Stockholm</p>
                </div>
                <div className=" flex flex-row ">
                    <WalletIcon />
                    <p className="ml-2">{moreInfo.price}</p>
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

export default function FullCard({infoState}) {

    const [infoCard, setInfoCard] = infoState;
    const [moreInfo, setMoreInfo] = useState ({
        longInfo : '',
        price : ''
      //  openHours : []
    })

    useEffect(() => {

        // fetches the missing info for extended info page

        const getMoreInfo = async () => {
            var sigtId = infoCard.id
            // if true, get TimeInfo and PriceInfo as well
        
            // call getInfo
            let info = await fetch (`http://localhost:4000/info?sightId=${sigtId}&onlyLong=true`)
            .then(res => {
                let json = res.json ();
                return json
            })
           .then (json => {
                return json
            })
        
            // parse response json
            /* var openHours
           if (info[0]) {
                openHours = [info[0].monday, info[0].tuesday, info[0].wednesday, info[0].thursday, info[0].friday, info[0].saturday, info[0].sunday]
            }   */
            
            setMoreInfo (
                {
                    longInfo: info[0].long_info,
                    price: info[0].price
                    // openHours: openHours
                }
            )
        }

        getMoreInfo ()
    }, [])

    var id = infoCard.id
    var pics = infoCard.nmbrOfPics
    var name = infoCard.name

    return (
        /* Card body */
        <div className=" z-30 w-full h-full bg-opacity-0 font-inriaSans ">
            <div className=" relative h-[calc(100vh-var(--navbar-height)-5rem)] ">
                <Image data={[id, pics]} />
                <div className="items-center mx-3 rounded-[30px] p-3 text-white bg-infoColor backdrop-blur-[2px] bg-opacity-30 absolute bottom-6 left-0 right-0 max-h-[40%] overflow-scroll overflow-x-hidden ">
                    <InfoBox data={[name, moreInfo]}/>
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