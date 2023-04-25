import React from "react";
import Like from "../../Components/icons/Like.svg";
import Dislike from "../../Components/icons/Dislike.svg";
import Logo from "../../Components/icons/Logo.svg";
import SelectCity from "../../Components/buttons/selectCity";
import City from "../../Components/icons/City";
import Arrow from "../../Components/icons/Arrow";

// const images = [HomeIcon, CultureGo]

const home = () => {
  return (
    <div className="bg-white">
      <Header />
      <div className="flex justify-end">
        <CitySelector />
      </div>

      <div className="bg-white flex flex-col gap-10 h-screen">
        <div className="relative h-[65%] w-auto font-inriaSans p-3">
          <div className="bg-gradient-to-t from-transparent from-30% to-white absolute top-0 bottom-0 left-0 right-0 z-10"></div>
          <Image />
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <InfoBox />
          </div>
        </div>
        <Buttons />
      </div>
    </div>
  );
};

export default home;

const Image = () => {
  let img =
    "https://www.city-guide-stockholm.com/_bibli/annonces/455/hd/abba-museum-03.jpg";
  return (
    <div className="h-full">
      <img src={img} className="rounded-b-[30px] object-none h-full"></img>
    </div>
  );
};

const InfoBox = () => {
  return (
    <div className="items-center bg-infoColor rounded-[30px] p-3 text-white backdrop-blur-[2px] bg-opacity-30">
      <h1 className="italic text-[24px]">Abba The Museum</h1>
      <p className="text-[16px]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit eligendi
        unde facilis officia ad temporibus. Molestias beatae expedita,
        doloremque consequuntur, voluptatum nesciunt reprehenderit eius enim
        labore, modi assumenda perspiciatis obcaecati?
      </p>
      <div className="flex justify-end">
        <Arrow />
      </div>
    </div>
  );
};

const Buttons = () => {
  return (
    <div className="flex flex-row gap-24 justify-center">
      <img src={Dislike}></img>
      <img src={Like}></img>
    </div>
  );
};

const Header = () => {
  return (
    <header className="p-3 pt-10">
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

const getPicture = async () => {
  return await fetch(
    "https://iynsfqmubcvdoqicgqlv.supabase.co/storage/v1/object/public/team-charlie-storage/charlie.jpg",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const ArrowButton = () => {};
