import React, { useEffect, useState } from "react";
import TimeBackground from "../../components/timepage/TimeBackground";
import PhotoUpload from "../../components/timepage/PhotoUpload";
import BackBtn from "../../assets/common/back-btn.svg";
import { useNavigate } from "react-router-dom";

const PhotoUploadpage = () => {
  const [currentTime, setCurrentTime] = useState(new Date().getHours());
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentTime(new Date().getHours());
    console.log("현재 시간!", currentTime);
  }, []);

  const navigateToTimePage = () => {
    navigate("/time");
  };

  return (
    <>
      <TimeBackground currentTime={currentTime} />
      <PhotoUpload />
      <div className="absolute left-0 bottom-0 flex items-center p-5">
        <img
          src={BackBtn}
          alt="뒤로가기"
          onClick={navigateToTimePage}
        />
      </div>
    </>
  );
};

export default PhotoUploadpage;
