import React, { useState, useEffect } from "react";
import Like from "../../Components/icons/Like.svg";
import Dislike from "../../Components/icons/Dislike.svg";
import Logo from "../../Components/icons/Logo.svg";
import CityButton from "../../Components/buttons/button";
import City from "../../Components/icons/City";
import serverUrl from '../../address'


import Card from "./Card";

const userId = 'cfb5b9bd-ece8-470e-89c0-8ac52122652a' //charlie

const getOpenHoursToday = (openHours) => {
  const day = new Date().getDay()
  if (openHours) {
    switch (day) {
      case 0:
        return openHours.sunday
      case 1:
        return openHours.monday
      case 2:
        return openHours.tuesday
      case 3:
        return openHours.wednesday
      case 4:
        return openHours.thursday
      case 5:
        return openHours.friday
      case 6:
        return openHours.saturday
      default:
        return '-'
    }
  }
  return '-'
}

const Home = () => {
  const [itemData, setItemData] = useState({
    name: "",
    shortInfo: "",
    images: [],
    shortPrice: "",
    openHoursToday: "",
    location: "",
  });

  const [nextItemData, setNextItemData] = useState({
    name: "",
    shortInfo: "",
    images: [],
    shortPrice: "",
    openHoursToday: "",
    location: "",
  });

  const [currentSight, setCurrentSight] = useState(15)
  const [currentImage, setCurrentImage] = useState(0)
  const [sights, setSights] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://${serverUrl}:4000/getitem?amount=50`);
      const data = await response.json();
      setSights(data)
      setItemData({
        name: data[currentSight].name,
        shortInfo: data[currentSight].short_info,
        images: data[currentSight].images,
        shortPrice: data[currentSight].short_price,
        openHoursToday: getOpenHoursToday(data[currentSight].open_hours),
        location: data[currentSight].location
      });
      setNextItemData({
        name: data[currentSight + 1].name || data[0].name,
        shortInfo: data[currentSight + 1].short_info || data[0].short_info,
        images: data[currentSight + 1].images || data[0].images,
        shortPrice: data[currentSight + 1].short_price || data[0].short_price,
        openHoursToday: getOpenHoursToday(data[currentSight + 1].open_hours || data[0].open_hours),
        location: data[currentSight + 1].location
      });
    };
    fetchData();
    if (currentSight === 23) {
      setCurrentSight(0)
    } else {
      setCurrentSight(currentSight + 1)
    }
  }, []);

  return (
    <div className="bg-white z-10 w-full absolute overflow-hidden h-[calc(100%-var(--navbar-height))]">
      <Header />
      <div className="flex justify-end px-7">
        <CitySelector />
      </div>
      <div className="bg-white flex flex-col h-[calc(100%-10%-1.5rem)]">
        <Card currentImage={currentImage} setCurrentImage={setCurrentImage} itemData={itemData} />
        <Buttons currentSightData={[currentSight, setCurrentSight]} currentItemData={[itemData, setItemData]} currentImageData={[currentImage, setCurrentImage]} sights={sights} />
      </div>
    </div>
  );
};

export default Home;

const Buttons = ({ currentSightData: [currentSight, setCurrentSight], currentItemData: [itemData, setItemData], sights, currentImageData: [currentImage, setCurrentImage] }) => {
  function updateSight() {
    if (currentSight === 23) {
      setCurrentSight(0)
    } else {
      setCurrentSight(currentSight + 1)
    }
    setItemData({
      name: sights[currentSight].name,
      shortInfo: sights[currentSight].short_info,
      images: sights[currentSight].images,
      shortPrice: sights[currentSight].short_price,
      openHoursToday: getOpenHoursToday(sights[currentSight].open_hours),
      location: sights[currentSight].location
    });
    setCurrentImage(0)
  }
  async function handleLikeClick() {
    let likedSightId = ''
    if (currentSight === 0) {
      likedSightId = sights[sights.length - 1].sight_id
    }
    else {
      likedSightId = sights[currentSight - 1].sight_id
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

  async function handleDislikeClick() {
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

const ArrowButton = () => { };
