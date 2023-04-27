import React, { useState, useEffect } from "react";
import Like from "../../Components/icons/Like.svg";
import Dislike from "../../Components/icons/Dislike.svg";
import Logo from "../../Components/icons/Logo.svg";
import CityButton from "../../Components/buttons/button";
import City from "../../Components/icons/City";
import Arrow from "../../Components/icons/Arrow";
import serverUrl from '../../address'

const userId = 'cfb5b9bd-ece8-470e-89c0-8ac52122652a' //charlie

const Home = () => {
  const [itemData, setItemData] = useState({
    name: "",
    shortInfo: "",
    images: [],
  });
  const [currentSight, setCurrentSight] = useState(23)
  const [currentImage, setCurrentImage] = useState(0)
  const [sights, setSights] = useState([])

  useEffect(() => {
    // Update the document title using the browser API
    const fetchData = async () => {
      //const response = await fetch(`http://${serverUrl}:4000/getitem?amount=50`);
      const response = await fetch("http://130.229.156.232:4000/getitem?amount=50", {
        "referrer": "https://culture-go.vercel.app/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "omit"
      });
      const data = await response.json();
      setSights(data)
      setItemData({
        name: data[currentSight].name,
        shortInfo: data[currentSight].short_info,
        images: data[currentSight].images,
      });
    };
    fetchData();
    if(currentSight === 23) {
      setCurrentSight(0)
    } else {
      setCurrentSight(currentSight + 1)
    }
  }, []);

  const handleImageChange = (side) => {
    if(side === "left") {
      if(currentImage === 0) {
        setCurrentImage(itemData.images.length - 1)
      } else {
        setCurrentImage(currentImage - 1)
      }
    } else if(side === "right"){
      if(currentImage === itemData.images.length - 1) {
        setCurrentImage(0)
      } else {
        setCurrentImage(currentImage + 1)
      }
    }
  }

  return (
    <div className="bg-white w-full relative overflow-hidden h-[calc(100%-var(--navbar-height))]">
      <Header />
      <div className="flex justify-end px-7">
        <CitySelector />
      </div>

      <div className="bg-white flex flex-col h-[calc(100%-10%-1.5rem)]">
        <div className="relative h-[85%] w-auto font-inriaSans px-3">
          <div className="w-full h-full absolute flex">
            <div className="w-1/2 h-full relative" onClick={()=>handleImageChange('left')}></div>
            <div className="w-1/2 h-full relative" onClick={()=>handleImageChange('right')}></div>
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
          <Image imgUrl={itemData.images[currentImage]} />
          <div className="absolute bottom-0 left-0 right-0 px-3">
            <InfoBox name={itemData.name} info={itemData.shortInfo} />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex gap-x-5">
            {itemData.images.map((image, index) => {
              return <div 
                className={`${index===currentImage?'bg-primaryDark':'bg-white'} rounded-full w-3 h-3`} 
                key={image}
                onClick={()=>setCurrentImage(index)}
                />
            })}
            
          </div>
        </div>
        <Buttons currentSightData={[currentSight, setCurrentSight]} currentItemData={[itemData, setItemData]} currentImageData={[currentImage, setCurrentImage]} sights={sights}/>
      </div>
    </div>
  );
};

export default Home;

const Image = ({ imgUrl }) => {
  return (
    <div className="h-full">
      <img alt={imgUrl} src={imgUrl} className="rounded-b-[30px] object-cover h-full"></img>
    </div>
  );
};

const InfoBox = ({ name, info }) => {
  return (
    <div className="items-center bg-infoColor rounded-[30px] p-3 text-white backdrop-blur-[2px] bg-opacity-70">
      <h1 className="italic text-2xl px-5 font-bold">{name}</h1>
      <p className="text-base p-5">{info} </p>
      <div className="flex justify-end">
        <Arrow />
      </div>
    </div>
  );
};

const Buttons = ({currentSightData: [currentSight, setCurrentSight], currentItemData: [itemData, setItemData], sights, currentImageData:[currentImage, setCurrentImage]}) => {
  function updateSight() {
    if(currentSight === 23) {
      setCurrentSight(0)
    } else {
      setCurrentSight(currentSight + 1)
    }
    setItemData({
      name: sights[currentSight].name,
      shortInfo: sights[currentSight].short_info,
      images: sights[currentSight].images,
    });
    setCurrentImage(0)
  }
  async function handleLikeClick(){
    let likedSightId = ''
    if(currentSight === 0) {
      likedSightId = sights[sights.length-1].sight_id
    }
    else {
      likedSightId = sights[currentSight-1].sight_id
    }
    await fetch(`http://${serverUrl}:4000/addlikes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        sightId: likedSightId,
      }),
    });
    updateSight()
  }

  async function handleDislikeClick(){
    //TODO: handle dislike
    updateSight()
  }

  return (
    <div className="h-[15%] flex-col justify-center flex p-5">
      <div className="flex flex-row gap-[30%] justify-center h-32 w-full">
        <div onClick={() => handleDislikeClick()}>
          <img src={Dislike}></img>
        </div>
        <div onClick={() => handleLikeClick()}>
          <img src={Like}></img>
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <header className="p-3 pt-5 h-[10%]">
      <img src={Logo}></img>
    </header>
  );
};

const CitySelector = () => {
  function clickHandle() {
    console.log("clicked");
  }

  return (
    <CityButton
      text="Stockholm"
      icon={City}
      size="small"
      clickHandler={clickHandle}
    />
  );
};

const ArrowButton = () => {};
