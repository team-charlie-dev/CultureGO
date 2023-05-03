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

  const [upperCardTop, setUpperCardTop] = useState(0)
  const [upperCardLeft, setUpperCardLeft] = useState(0)
  const [upperCardTransform, setUpperCardTransform] = useState(0)
  

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
        name: data[currentSight + 1].name,
        shortInfo: data[currentSight + 1].short_info,
        images: data[currentSight + 1].images,
        shortPrice: data[currentSight + 1].short_price,
        openHoursToday: getOpenHoursToday(data[currentSight + 1].open_hours),
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
    setNextItemData({
      name: sights[currentSight + 1].name,
      shortInfo: sights[currentSight + 1].short_info,
      images: sights[currentSight + 1].images,
      shortPrice: sights[currentSight + 1].short_price,
      openHoursToday: getOpenHoursToday(sights[currentSight + 1].open_hours),
      location: sights[currentSight + 1].location
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

  const lift = (e) => {
     if(e.clientX == NaN || e.clientX == null){
       var clientX = e.touches[0].clientX;
     }if(e.clientY == NaN || e.clientY == null){
       var clientY = e.touches[0].clientY;
     }
   
     holding = true;
     startX = clientX;
     startY = clientY;
   
     document.getElementById("disable").style.opacity = 0;
     document.getElementById("disable2").style.opacity = 0;
     document.getElementById("disable22").style.opacity = 0;
     
   }
   
   var holding = false;
   var startX;
   var startY;
   
   var StartPosX =0;
   var StartPosY = 0;
   
   const move = (e) => {
       
     if(e.clientX == NaN || e.clientX == null){
       var clientX = e.touches[0].clientX;
     }if(e.clientY == NaN || e.clientY == null){
       var clientY = e.touches[0].clientY;
     }
     var procent = (-startX + clientX ) / window.innerWidth;
   
   
     if(holding){
       setUpperCardLeft(-startX + clientX + "px")
       setUpperCardTop(0)
       setUpperCardTransform("rotate(" + 25*(procent) + "deg)")
     }
   }
   
   const getDistance = (x1, y1, x2, y2) => {
     let y = x2 - x1;
     let x = y2 - y1;
     
     return Math.sqrt(x * x + y * y);
   }

   var i = 0;
   
   const release = (e) => {
     if(e.clientX == NaN || e.clientX == null){
       var clientX = e.changedTouches[0].clientX;
     }if(e.clientY == NaN || e.clientY == null){
       var clientY = e.changedTouches[0].clientY;
     }
   
     holding = false;
     StartPosX =  -startX + clientX;
     StartPosY = -startY + clientY;
   
     var middlePosX = StartPosX + window.innerWidth / 2;
     var middlePosY = StartPosY + window.innerHeight / 2;
     var r = 150;
   
   
     if(getDistance(middlePosX,middlePosY, window.innerWidth/2, window.innerHeight/2 ) > r){
     
       moveAway(StartPosX, StartPosY);
     }else{
       moveHome(StartPosX, StartPosY);
     }
   
   
   
   }
   
   const moveHome = (xs, ys) => {
     
   
   
    var nrofFrames = 10;  
   
    var xPos = xs;
    var yPos = ys;
   
    var movespeedX = xPos / nrofFrames;
    var movespeedY = yPos / nrofFrames;
   
    var myInterval = setInterval(function() {
   
   
      if(xPos <= 0){
       document.getElementById("cardTest").style.left = (0) + "px";
       
     }else{
       xPos = (xPos - movespeedX);
       document.getElementById("cardTest").style.left = parseInt(xPos) + "px";
     }
   
   
     if(yPos <= 0){
       document.getElementById("cardTest").style.top = (0) + "px";
     }else{
       yPos = (yPos - movespeedY);
       document.getElementById("cardTest").style.top = parseInt(yPos) + "px";
     }
   
     if(parseInt(yPos) <= 0 && parseInt(xPos) <= 0){
       document.getElementById("cardTest").style.top = (0) + "px";
       document.getElementById("cardTest").style.left = (0) + "px";
       document.getElementById("cardTest").style.transform = "rotate(" + 0*(0) + "deg)";
       clearInterval(myInterval);
     }
   }, 5);
   
   }
   
   const moveAway= (xs, ys) => {
   
   
       var nrofFrames = 10;  
    
       var xPos = xs;
       var yPos = ys;
    
   
   
       var movespeedX = 0.4*xPos / nrofFrames;
       var movespeedY = 0.4*yPos / nrofFrames;
    
       var myInterval = setInterval(function() {
    
    
          xPos = (xPos + movespeedX);
          document.getElementById("cardTest").style.left = parseInt(xPos) + "px";
   
          yPos = (yPos + movespeedY);
          document.getElementById("cardTest").style.top = parseInt(yPos) + "px";
        
    
        if(yPos <= -window.innerHeight || yPos >= window.innerHeight){
         document.getElementById("cardTest").style.top = (0) + "px";
         document.getElementById("cardTest").style.left = (0) + "px";
         
   
        document.getElementById("cardTest").style.transform = "rotate(" + 0*(0) + "deg)";
        isOut(movespeedX);
         clearInterval(myInterval);
        }
        if(xPos <= -window.innerWidth || xPos >= window.innerWidth){
          
         document.getElementById("cardTest").style.top = (0) + "px";
         document.getElementById("cardTest").style.left = (0) + "px";
         
   
     document.getElementById("cardTest").style.transform = "rotate(" + 0 + "deg)";
     isOut(movespeedX);

         clearInterval(myInterval);
        }
   
      }, 5);
   
    }

  const isOut = (movespeedX) => {

    if(movespeedX > 0) {
      handleLikeClick()
    } else {
      handleDislikeClick()
    }
    updateSight();
  }

  return (
    <>
    <div id="cardTest"  className=" rounded-md  z-20 w-full absolute overflow-hidden h-[calc(100%-var(--navbar-height))]">
      <Header />
      <div id="disable" className="flex justify-end px-7">
        <CitySelector />
      </div>
      <div onTouchEnd={release} onTouchStart={lift} onTouchMove={move} className=" flex flex-col h-[calc(100%-10%-1.5rem)]">
        <Card currentImage={currentImage} setCurrentImage={setCurrentImage} itemData={itemData} />
        <Buttons currentSight={currentSight} sights={sights} updateSight={updateSight} handleLikeClick={handleLikeClick} handleDislikeClick={handleDislikeClick}/>
      </div>
    </div>

    <div className="bg-white z-10 w-full absolute overflow-hidden h-[calc(100%-var(--navbar-height))]">
    <Header />
    <div className="flex justify-end px-7">
      <CitySelector />
    </div>
    <div id="testtestss"className="bg-white flex flex-col h-[calc(100%-10%-1.5rem)]">
      <Card currentImage={currentImage} setCurrentImage={setCurrentImage} itemData={nextItemData} />
      <Buttons currentSightData={[currentSight, setCurrentSight]} currentItemData={[itemData, setItemData]} nextItemData={[nextItemData, setNextItemData]} currentImageData={[currentImage, setCurrentImage]} sights={sights} />
    </div>
    </div></>
  );
};

const Buttons = ({handleLikeClick, handleDislikeClick}) => {
  return (
    <div  id="disable22"  className="h-[15%] flex-col justify-center flex p-5">
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
    <header id="disable2" className="p-3 pt-5 h-[10%]">
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
