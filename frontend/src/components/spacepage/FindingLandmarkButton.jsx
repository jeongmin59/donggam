import React from "react";
import { useNavigate  } from "react-router-dom";

const FindingLandmarkButton = ({ to }) => {
  const navigate = useNavigate ();

  const handleButtonClick = () => {
    navigate(to); // 클릭 시 지정한 경로로 이동
  };

  return(
    <>
    <div 
      className="mb-3 w-full h-[55px] bg-blue-300 rounded-3xl justify-center items-center gap-3 inline-flex"
      onClick={handleButtonClick}>
      
      <button
        className="font-['GmarketSansMedium'] font-base text-white" 
        onClick={handleButtonClick}>근처 랜드마크 찾기</button>
    </div>
    </>
  );
};

export default FindingLandmarkButton;