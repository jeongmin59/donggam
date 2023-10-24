import { useState } from "react";
import UserInfo from "./UserInfo";

const MainBackground = () => {
  const [selectedBackground, setSelectedBackground] = useState(1);

  // BG 
  const changeBackground = () => {
    setSelectedBackground((prevBackground) => (prevBackground % 3) +1);
  };

  const backgroundClass = `w-full h-full absolute ${
    selectedBackground === 1 ? "bg-gradient-1"
    : selectedBackground ===2 ? "bg-gradient-2"
    : "bg-gradient-3"
  }`;


  return (
    <div className="w-full h-screen overflow-hidden">
      <div className={backgroundClass} onClick={changeBackground}>
        <UserInfo />
        <button className="bg-red-200" >배경변경</button>
      </div>
      <div className="bottomBG w-full h-full relative bg-[#abcdf0]" style={{ zIndex: -1 }}>
        <img src="/background-image.png"
          className="w-full h-full absolute top-40 object-cover opacity-60 " />
      </div>
    </div>
  );
};

export default MainBackground;