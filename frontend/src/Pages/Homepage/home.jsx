import React, {useState, useEffect} from "react";
import Like from "../../Components/icons/Like.svg";
import Dislike from "../../Components/icons/Dislike.svg";
import Logo from "../../Components/icons/Logo.svg";
import SelectCity from "../../Components/buttons/selectCity";
import City from "../../Components/icons/City";
import Arrow from "../../Components/icons/Arrow";

// const images = [HomeIcon, CultureGo]


const Home = () => {
  const [itemData, setItemData] = useState({
    name: "",
    shortInfo: "",
    images: [],
  });
  
  useEffect(() => {
    // Update the document title using the browser API
    const fetchData = async () => {
      const response = await fetch("http://localhost:4000/getitem?amount=3");
      const data = await response.json();
      setItemData({
        name: data[1].name,
        shortInfo: data[1].short_info,
        images: data[1].images,
      });
    }
    fetchData()
  }, []);
  
  return (
    <div className="bg-white h-full w-full relative overflow-hidden">
      <Header />
      <div className="flex justify-end">
        <CitySelector />
      </div>

      <div className="bg-white flex flex-col h-screen">
        <div className="relative h-[65%] w-auto font-inriaSans p-3">
          <div style={{backgroundImage: 'linear-gradient(to top, rgba(255,255,255,0), rgba(255,255,255,1))', position: 'absolute', width: '100%', height: '10%'}}></div>
          <Image imgUrl={itemData.images[0]} />
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <InfoBox name={itemData.name} info={itemData.shortInfo} />
          </div>
        </div>
        <Buttons />
      </div>
    </div>
  );
};

export default Home;

const Image = ({imgUrl}) => {
  return (
    <div className="h-full">
      <img src={imgUrl} className="rounded-b-[30px] object-cover h-full"></img>
    </div>
  );
};

const InfoBox = ({name, info}) => {
  return (
    <div className="items-center bg-infoColor rounded-[30px] p-3 text-white backdrop-blur-[2px] bg-opacity-30">
      <h1 className="italic text-[24px]">{name}</h1>
      <p className="text-[16px]">
        {info}
      </p>
      <div className="flex justify-end">
        <Arrow />
      </div>
    </div>
  );
};

const Buttons = () => {
  return (
    <div className="flex flex-row gap-[40%] justify-center">
      <img src={Dislike}></img>
      <img src={Like}></img>
    </div>
  );
};

const Header = () => {
  return (
    <header className="p-3 pt-5">
      <img src={Logo}></img>
    </header>
  );
};

const CitySelector = () => {
  function clickHandle() {
    console.log("clicked");
  }

  return (
    <SelectCity
      text="Stockholm"
      icon={City}
      size="small"
      clickHandler={clickHandle}
    />
  );
};

const ArrowButton = () => {};
