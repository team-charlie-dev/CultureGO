import React, { useState, useEffect, useRef } from "react";
import Like from "../../Components/icons/Like.svg";
import Dislike from "../../Components/icons/Dislike.svg";
import Logo from "../../Components/icons/Logo.svg";
import CityButton from "../../Components/buttons/button";
import City from "../../Components/icons/City";
import serverUrl from '../../address'

import FullCard from "../../Components/FullCard/FullCard";
import Card from "./Card";

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

const emptyItem = {
  sightId: "",
  name: "",
  shortInfo: "",
  images: [],
  shortPrice: "",
  openHoursToday: "",
  location: "",
}

const getItemData = (sight) => {
  if (sight)
    return {
      name: sight.name,
      shortInfo: sight.short_info,
      images: sight.images,
      shortPrice: sight.short_price,
      openHoursToday: getOpenHoursToday(sight.open_hours),
      location: sight.location
    }
  else return emptyItem
}

const Home = ({setIsLoggedin, setIsLoading}) => {
  const [currentImage, setCurrentImage] = useState(0)
  const [sights, setSights] = useState([])
  const [isFetching, setIsFetching] = useState(false)

  const topCardRef = useRef();

  useEffect(() => {
    var ignore = false;
    const fetchData = async () => {
      setIsLoading(true)
      const response = await fetch(`${serverUrl}/algorithm?userID=${localStorage.getItem('user_id')}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem('token')
      }})
      const data = await response.json();
      if(response.status == 403){
        setIsLoggedin(false)
      }
      if (ignore)
        return;
      setSights(data)
      setIsLoading(false)
    };
    fetchData();

    return () => ignore = true
  }, []);
  
  const fetchSights = async () => {
    setIsFetching(true)
    fetch(`${serverUrl}/algorithm?userID=${localStorage.getItem('user_id')}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem('token')
      }})
      .then(res => res.json())
      .then(json => {
        setSights(arr => arr.concat(json))
        setIsFetching(false)
        setIsLoading(false)
      })
    }

  function updateSight() {
    console.log("UPDATING")
    console.log(sights)
    if (sights.length <= 3 && !isFetching)
      fetchSights()

    if (sights.length <= 1)
      setIsLoading(true)

    setSights(arr => arr.slice(1))
    setCurrentImage(0)
  }

  const sendSwipeMessage = async (sightId, like) => {
    const response = fetch(`${serverUrl}/swipe`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        'x-access-token': localStorage.getItem('token')
      },
      body: JSON.stringify({
        userId: localStorage.getItem('user_id'),
        sightId: sightId,
        liked: like
      }),
    })

    updateSight()
  }

  const lift = (e) => {
    if (e.clientX == NaN || e.clientX == null) {
      var clientX = e.touches[0].clientX;
    } if (e.clientY == NaN || e.clientY == null) {
      var clientY = e.touches[0].clientY;
    }

    holding = true;
    startX = clientX;
    startY = clientY;

    document.getElementById("disable1").style.opacity = 0;
    document.getElementById("disable2").style.opacity = 0;
    document.getElementById("disable3").style.opacity = 0;
  }

  var holding = false;
  var startX;
  var startY;

  var StartPosX = 0;
  var StartPosY = 0;

  const move = (e) => {
    if (e.clientX == NaN || e.clientX == null) {
      var clientX = e.touches[0].clientX;
    } if (e.clientY == NaN || e.clientY == null) {
      var clientY = e.touches[0].clientY;
    }

    var procent = (-startX + clientX) / window.innerWidth;

    if (holding) {
      topCardRef.current.style.left = -startX + clientX + "px";
      topCardRef.current.style.top = 0;
      topCardRef.current.style.transform = "rotate(" + 25 * (procent) + "deg)";
    }
  }

  const getDistance = (x1, y1, x2, y2) => {
    let y = x2 - x1;
    let x = y2 - y1;

    return Math.sqrt(x * x + y * y);
  }

  const release = (e) => {
    if (e.clientX == NaN || e.clientX == null) {
      var clientX = e.changedTouches[0].clientX;
    } if (e.clientY == NaN || e.clientY == null) {
      var clientY = e.changedTouches[0].clientY;
    }

    holding = false;
    StartPosX = -startX + clientX;
    StartPosY = -startY + clientY;

    var middlePosX = StartPosX + window.innerWidth / 2;
    var middlePosY = StartPosY + window.innerHeight / 2;
    var r = 150;

    if (getDistance(middlePosX, middlePosY, window.innerWidth / 2, window.innerHeight / 2) > r) {
      moveAway(StartPosX, 0);
    } else {
      moveHome(StartPosX, 0);
    }
  }

  const moveHome = (xs, ys) => {
    var nrofFrames = 10;

    var xPos = xs;
    var yPos = ys;

    var movespeedX = xPos / nrofFrames;
    var movespeedY = yPos / nrofFrames;

    var myInterval = setInterval(function () {
      if(!topCardRef.current){
        clearInterval(myInterval)
        return
      }
      if (xPos <= 0) {
        topCardRef.current.style.left = 0;
      } else {
        xPos = (xPos - movespeedX);
        topCardRef.current.style.left = parseInt(xPos) + "px";
      }

      if (yPos <= 0) {
        topCardRef.current.style.top = 0;
      } else {
        yPos = (yPos - movespeedY);
        topCardRef.current.style.top = parseInt(yPos) + "px";
      }

      if (parseInt(yPos) <= 0 && parseInt(xPos) <= 0) {
        topCardRef.current.style.top = 0;
        topCardRef.current.style.left = 0;
        topCardRef.current.style.transform = "rotate(" + 0 * (0) + "deg)";
        clearInterval(myInterval);
      }
    }, 5);
  }

  const moveAway = (xs, ys) => {
    var nrofFrames = 10;

    var xPos = xs;
    var yPos = ys;

    var movespeedX = 0.4 * xPos / nrofFrames;
    var movespeedY = 0.4 * yPos / nrofFrames;

    var myInterval = setInterval(function () {

      xPos = (xPos + movespeedX);
      topCardRef.current.style.left = parseInt(xPos) + "px";

      yPos = (yPos + movespeedY);
      topCardRef.current.style.top = parseInt(yPos) + "px";

      if (yPos <= -window.innerHeight || yPos >= window.innerHeight) {

        isOut(movespeedX);
        clearInterval(myInterval);
      }
      if (xPos <= -window.innerWidth || xPos >= window.innerWidth) {

        isOut(movespeedX);
        clearInterval(myInterval);
      }

    }, 5);
  }

  const isOut = (movespeedX) => {
    sendSwipeMessage(sights[0]?.sight_id, movespeedX > 0)
  }
  
  const [infoCard, setInfoCard] = useState(
    {
        show: false, 
        id: '5949257c-2cfa-4380-a609-6075a503e5fa',
        name: 'Kiungsträdgården',
        nmbrOfPics: 1
    }
  );

  const cardClickHandler = () => {
    setInfoCard({
      show: !infoCard.show,
      id: sights[0]?.sight_id,
      name: sights[0]?.name,
      nmbrOfPics: sights[0]?.images.length==0 ? 0 : 1
    })
  }

  const CardHolder = ({sight, firstCard, swipeFuncs: {release, lift, move}, cardClickHandler}) => {
    return (
      <div className="flex flex-col h-[calc(100%-10%-1.5rem)]"
        onTouchEnd={firstCard && sights.length ? release : () => {}} 
        onTouchStart={firstCard && sights.length ? lift : () => {}}
        onTouchMove={firstCard && sights.length ? move : () => {}}
      >
        <Card currentImage={currentImage} setCurrentImage={setCurrentImage} 
          itemData={getItemData(sight)} arrowClickHandler={cardClickHandler}/>
        <Buttons disable={firstCard} handleLikeClick={() => sendSwipeMessage(sight.sight_id, true)} handleDislikeClick={() => sendSwipeMessage(sight.sight_id, false)}/>
      </div>
    )
  }

  return (
    <>
      <div className="h-full w-full bg-white">
      
        <div className="bg-white w-full absolute overflow-hidden h-[calc(100%-var(--navbar-height))]">
          <Header />
          <div className="flex justify-end px-7">
            <CitySelector />
          </div>
          <div id="testtestss" className="bg-white flex flex-col h-[calc(100%-10%-1.5rem)]">
            <Card mode={""}currentImage={currentImage} setCurrentImage={setCurrentImage} itemData={getItemData(sights[1])} arrowClickHandler={cardClickHandler}/>
            <Buttons />
          </div>
        </div>
      {
        sights.slice(0).reverse().map(sight => 
          {
            let isFirst = sights.indexOf(sight) == 0
            return (
              <div key={sight.sight_id} id={isFirst ? "upperCard" : ""} ref={isFirst ? topCardRef : undefined} 
                className={`rounded-md w-full absolute overflow-hidden h-[calc(100%-var(--navbar-height))]`}>
                <Header disable={isFirst}/>
                <div id={isFirst ? "disable1" : ""} className="flex justify-end px-7">
                  <CitySelector/>
                </div>
                  
                <CardHolder sight={sight} firstCard={sights.indexOf(sight) == 0} swipeFuncs={{release, lift, move}} cardClickHandler={cardClickHandler}/>

              </div>
            )
          }

          )
      }
      </div>
      
      { infoCard.show ?
        <div className="absolute h-full w-full pt-20 top-0 left-0">
          <FullCard infoState={[infoCard, setInfoCard]} setIsLoading={setIsLoading}/>
        </div> 
      : <></> }
      </>
  );
};

const Buttons = ({ handleLikeClick, handleDislikeClick, disable }) => {
  return (
    <div id={disable ? "disable2" : ""} className="h-[15%] flex-col justify-center flex p-5">
      <div className="flex flex-row gap-[30%] justify-center h-32 w-full">
        <div onClick={handleDislikeClick}>
          <img src={Dislike}></img>
        </div>
        <div onClick={handleLikeClick}>
          <img src={Like}></img>
        </div>
      </div>
    </div>
  );
};

const Header = ({disable}) => {
  return (
    <header id={disable ? "disable3" : ""} className="p-3 pt-5 h-[10%]">
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

export default Home;
