import React, { useEffect, useState } from "react";
import PhotoDetail from "../../components/timepage/PhotoDetail";
import TimeBackground from "../../components/timepage/TimeBackground";

const PhotoDetailPage= () => {
  const [currentTime, setCurrentTime] = useState(new Date().getHours()); 

  useEffect(() => {
    setCurrentTime(new Date().getHours());
    console.log("현재 시간!", currentTime);
  }, []);

  return (
    <>
      <TimeBackground currentTime={currentTime} />
      <PhotoDetail />
    </>
  );
};

export default PhotoDetailPage;