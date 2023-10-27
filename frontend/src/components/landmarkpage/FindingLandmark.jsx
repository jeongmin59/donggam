import React from "react";
import landmark from "../../assets/landmark/landmark.png"
// import sad from "../../assets/landmark/sad.png"

const FindingLandmark = () => {
  return(
    <div className="px-5 h-screen flex justify-center items-center bg-gradient-to-b from-sky-100 to-blue-200">
      <div className="flex flex-col items-center">
        <h3>근처에 있는 랜드마크를 찾았어요.</h3>
        <img 
          src={landmark} 
          alt="랜드마크 이미지" 
          className="w-56 h-56 mt-4"
        />
        <h2 className="mt-4">SSAFY 부울경 캠퍼스</h2>
      </div>
    </div>
  );
};

export default FindingLandmark;
{/* <img src={sad} alt="슬픈 표정 이미지" /> */}