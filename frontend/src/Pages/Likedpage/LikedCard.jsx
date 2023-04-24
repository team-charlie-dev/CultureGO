import LocationPin from "../../Components/icons/LocationPin.svg";

const LikedCard = ({name, location, img}) => {

    console.log(img);
    return (
        <div style={{backgroundImage: `url(${img}`, backgroundSize: 'cover'}} className="w-full rounded-lg pt-12 mt-2 relative text-white">
            <div className=" pt-2 pb-12 bg-black w-full text-center bg-opacity-20 rounded-lg ">
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