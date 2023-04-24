// import CultureGo from "../../Components/icons/CultureGo";
// import HomeIcon from "../../Components/icons/HomeIcons";
import TrashIcon from "../../Components/icons/Trash.svg";
import SortIcon from "../../Components/icons/Sort.svg";

import LikedCard from "./LikedCard";

const Liked = () => {

    const list = [<LikedCard name='Abba the museum' location='Stockholm'
    img='https://iynsfqmubcvdoqicgqlv.supabase.co/storage/v1/object/public/team-charlie-storage/charlie.jpg'/>,
    
    <LikedCard name='Abba the museum' location='Stockholm'
    img='https://iynsfqmubcvdoqicgqlv.supabase.co/storage/v1/object/public/team-charlie-storage/charlie.jpg'/>]

    return (
        <div className=" w-screen h-screen bg-white">
            <div className=" w-screen h-20 bg-primaryDark">
                {/* top of screen w/ logo */}

            </div>
            <div className="w-screen h-20 bg-primaryLight relative">
                {/* options bar */}
                <p className="pt-3 text-xl text">Your liked items:</p>
                <div className="absolute right-5 flex ">
                    <img src={TrashIcon} className="pr-2"></img>
                    <img src={SortIcon}></img>
                </div>

            </div>
            <div className=" w-full h-auto bg-secondaryLight p-5">
                {/* container for list */}
                {
                    list
                }
                
            </div>
        </div>
    )
}

export default Liked