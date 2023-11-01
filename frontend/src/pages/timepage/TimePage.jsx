import React from "react";
import TimeBackground from "../../components/timepage/TimeBackground";
import CreateButton from "../../components/common/CreateButton";
import PhotoList from "../../components/timepage/PhotoList";
import BestPhoto from "../../components/timepage/BestPhoto";

const TimePage = ({ currentTime }) => {

  return (
    <>
      <TimeBackground currentTime={currentTime} />
      {(currentTime >= 7 && currentTime < 10) || (currentTime >= 11 && currentTime < 14) || (currentTime >= 17 && currentTime < 20) ? <PhotoList /> : <BestPhoto />}
      <CreateButton to="/time/upload" />
    </>
  );
};

export default TimePage;