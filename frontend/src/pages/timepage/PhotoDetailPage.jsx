import React, { useEffect, useState } from "react";
import PhotoDetail from "../../components/timepage/PhotoDetail";
import TimeBackground from "../../components/timepage/TimeBackground";
import BackBtn from "../../assets/common/back-btn.svg";
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
      <div className="flex items-end p-2">
        <img
          src={BackBtn}
          alt="뒤로가기"
          onClick={navigateToTimePage}
        />
        <div>뒤로가기</div>
      </div>
      <PhotoDetail />
    </>
  );
};

export default PhotoDetailPage;