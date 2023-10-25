import { useState } from "react";
import UserInfo from "./UserInfo";
import SideButtons from "./SideButtons";

const MainBackground = () => {
  const [selectedBackground, setSelectedBackground] = useState(1);

  // BG 
  const changeBackground = () => {
    setSelectedBackground((prevBackground) => (prevBackground % 3) +1);
  };

  const backgroundClass = `w-full h-screen absolute ${
    selectedBackground === 1 ? "bg-positive"
    : selectedBackground ===2 ? "bg-neutral"
    : "bg-negative"
  }`;
  // const backgroundClass = `w-full h-full absolute ${
  //   selectedBackground === 1 ? "bg-gradient-1"
  //   : selectedBackground ===2 ? "bg-gradient-2"
  //   : "bg-gradient-3"
  // }`;



  return (
    <div className="h-screen overflow-hidden">
      <div className={backgroundClass} style={{zIndex:3,backgroundSize: "cover" }}>
        <UserInfo />
        <SideButtons />
        <button className="bg-red-200" onClick={changeBackground}>배경변경</button>
      </div>
      <div className="bottomBG h-screen relative bg-[#abcdf0]" style={{ zIndex: -1 }}>
        <img src="/images/background-image.png"
          className="h-full absolute top-40 object-cover opacity-60 " />
      </div>
    </div>
  );
};

export default MainBackground;