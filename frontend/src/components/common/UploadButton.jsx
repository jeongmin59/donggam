import React from "react";
import { useNavigate } from "react-router-dom";

const UploadButton = ({ onUpload, to }) => {
  const navigate = useNavigate();

  const handleUploadClick = (event) => {
    event.preventDefault(); // 중복 이벤트 실행 방지
    onUpload();
    navigate(to);
  };

  return (
    <div 
      className="w-full h-[55px] bg-white rounded-[80px] border-2 border-blue-200 justify-center items-center gap-[12.28px] inline-flex"
      onClick={handleUploadClick}
    >
      <button
        className="font-['GmarketSansMedium'] font-base text-blue-200" 
      >업로드</button>
    </div>
  );
};

export default UploadButton;
