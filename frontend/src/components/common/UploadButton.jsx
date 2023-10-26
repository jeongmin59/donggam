import React from "react";

const UploadButton = ({ onUpload }) => {
  const handleUploadClick = () => {
    // 업로드 버튼 클릭 시 업로드 시작하는 함수 호출함
    onUpload();
  };

  return (
    <div 
      className="w-full h-[55px] bg-white rounded-[80px] border-2 border-blue-200 justify-center items-center gap-[12.28px] inline-flex"
      onClick={handleUploadClick}>
      
      <button
        className="font-['GmarketSansMedium'] font-base text-blue-200" 
        onClick={handleUploadClick}>업로드</button>
    </div>
  );
};

export default UploadButton;
