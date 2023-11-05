import React, { useEffect, useState } from "react";
import TimeBackground from "../../components/timepage/TimeBackground";
import PhotoUpload from "../../components/timepage/PhotoUpload";

const PhotoUploadpage = () => {
  const [currentTime, setCurrentTime] = useState(new Date().getHours()); 

  useEffect(() => {
    setCurrentTime(new Date().getHours());
    console.log("현재 시간!", currentTime);
  }, []);

  return (
    <>
      <TimeBackground currentTime={currentTime} />
      <PhotoUpload />
    </>
  );
};

export default PhotoUploadpage;