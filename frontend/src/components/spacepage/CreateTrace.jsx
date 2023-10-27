import React from "react";
import { useNavigate  } from "react-router-dom";

const CreateTrace = ({ to }) => {
  const navigate = useNavigate ();

  const handleButtonClick = () => {
    navigate(to); // 클릭 시 지정한 경로로 이동
  };

  return(
    <>
      <div 
        className="mb-3 w-80 h-24 bg-white rounded-2xl border border-blue-200 flex-col justify-center items-center gap-2.5 inline-flex"
        onClick={handleButtonClick}>
        
        <button
          className="font-['GmarketSansMedium'] font-base text-blue-200" 
          onClick={handleButtonClick}>방명록 등록하기</button>
      </div>
    </>
  );
};

export default CreateTrace;