import React, { useEffect, useState } from "react";
import TimeBackground from "../../components/timepage/TimeBackground";
import CreateButton from "../../components/common/CreateButton";
import PhotoList from "../../components/timepage/PhotoList";
import BestPhoto from "../../components/timepage/BestPhoto";
import NavBar from "../../components/common/NavBar";

const TimePage = () => {
  const [currentTime, setCurrentTime] = useState(new Date().getHours()); 

  useEffect(() => {
    setCurrentTime(new Date().getHours());
    console.log("현재 시간!", currentTime);
  }, []);

  return (
    <>
      <TimeBackground currentTime={currentTime} />
      {(currentTime >= 7 && currentTime < 10) || (currentTime >= 11 && currentTime < 14) || (currentTime >= 17 && currentTime < 20) ? (
        <div>
          <PhotoList />
        </div>
      ) : (
        <div>
          <BestPhoto />
        </div>
      )}

      <NavBar />

    </>
  );
};

export default TimePage;
