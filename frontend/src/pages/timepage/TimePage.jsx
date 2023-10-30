import React from "react";
import TimeBackground from "../../components/timepage/TimeBackground";
import CreateButton from "../../components/common/CreateButton";
import PhotoList from "../../components/timepage/PhotoList";

const TimePage = () => {
  return (
    <>
      <TimeBackground />
      <PhotoList />
      <CreateButton to="/time/upload" />
    </>
  );
};

export default TimePage;