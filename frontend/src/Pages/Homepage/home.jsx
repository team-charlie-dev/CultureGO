import React from "react";
import Like from "../../Components/icons/Like.svg";
import Dislike from "../../Components/icons/Dislike.svg";

// const images = [HomeIcon, CultureGo]

const home = () => {
  return (
    <div className="bg-white flex flex-col justify-center items-center gap-10 h-screen">
      <Image />
      <InfoBox />
      <Buttons />
    </div>
  );
};

export default home;

const Image = () => {
  let img =
    "https://imgv3.fotor.com/images/blog-cover-image/part-blurry-image.jpg";
  return (
    <div className="bg-gradient-to-t from-primary-100 to-primaryLight-500">
      <img src={img} className=""></img>
    </div>
  );
};

const InfoBox = () => {
  return (
    <div>
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
    <div className="flex flex-row gap-24">
      <img src={Dislike}></img>
      <img src={Like}></img>
    </div>
  );
};
