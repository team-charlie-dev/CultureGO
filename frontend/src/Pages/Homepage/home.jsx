import React from "react";
import Like from "../../Components/icons/Like.svg";
import Dislike from "../../Components/icons/Dislike.svg";
import Logo from "../../Components/icons/Logo.svg";

// const images = [HomeIcon, CultureGo]

const home = () => {
  return (
    <div className="bg-white flex flex-col gap-10 h-screen">
      <Header />

      <div className="relative min-h-[500px] w-auto">
        <div className="bg-gradient-to-t from-transparent from-10% to-white absolute top-0 bottom-0 left-0 right-0 z-10">
        </div>
        <Image />
        <div className="absolute bottom-0 left-0 right-0">
          <InfoBox />
        </div>
      </div>

      <Buttons />
    </div>
  );
};

export default home;

const Image = () => {
  let img =
    "https://www.city-guide-stockholm.com/_bibli/annonces/455/hd/abba-museum-03.jpg";
  return (
    <div className="min-h-[500px]">
      <img src={img} className="rounded-[30px] object-none h-[600px]"></img>
    </div>
  );
};

const InfoBox = () => {
  return (
    <div className="items-center bg-infoColor rounded-[30px] p-3 text-white backdrop-blur-[2px] bg-opacity-30">
      <h1>Title</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit eligendi
        unde facilis officia ad temporibus. Molestias beatae expedita,
        doloremque consequuntur, voluptatum nesciunt reprehenderit eius enim
        labore, modi assumenda perspiciatis obcaecati?
      </p>
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
    <header className="p-3">
      <img src={Logo}></img>
    </header>
  );
};
