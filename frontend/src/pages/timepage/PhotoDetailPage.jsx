import React, { useEffect, useState } from "react";
import PhotoDetail from "../../components/timepage/PhotoDetail";
import TimeBackground from "../../components/timepage/TimeBackground";
import BackBtn from "../../assets/icons/detail-back-btn.svg";
import { useNavigate } from "react-router-dom";

const PhotoDetailPage= () => {
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
      <div className="bg-white h-[75vh]">
        <PhotoDetail />
        <div className="mb-8 flex justify-center">
          <img
            src={BackBtn}
            alt="뒤로가기"
            onClick={navigateToTimePage}
          />
        </div>
      </div>
    </>
  );
};

export default PhotoDetailPage;