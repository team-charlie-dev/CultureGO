import LocationPin from "../../Components/icons/LocationPin.svg";

const LikedCard = ({name, location, img}) => {

    console.log(img);
    return (
        <div style={{backgroundImage: `url(${img}`, backgroundSize: 'cover'}} className="w-full rounded-lg pt-10 mt-5 relative">
            <div className=" pt-2 pb-12 bg-primaryDark w-full text-center bg-opacity-50 rounded-lg ">
                {name}
            </div>
            
            <div className=" absolute left-0 bottom-0 flex">
                <img src={LocationPin} alt=""/>
                {location}
            </div>
        </div>

    )
}

export default LikedCard