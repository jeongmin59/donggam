import React from "react";

const PhotoList = () => {
  return (
    <div className="px-6">
      <div className="w-72 h-96 relative">
        <div className="w-36 h-48 left-0 top-[66px] absolute">
          <div className="w-36 h-48 left-0 top-0 absolute bg-gradient-to-b from-black to-black rounded-lg" />
          <div className="w-20 h-5 left-[15.01px] top-[164.05px] absolute text-white text-xs font-bold font-['Gmarket Sans TTF']">오늘 출근길</div>
          <div className="w-7 h-7 left-[99.28px] top-[15.45px] absolute" />
        </div>
        <div className="w-36 h-48 left-[165px] top-0 absolute">
          <div className="w-36 h-48 left-0 top-0 absolute bg-gradient-to-b from-black to-black rounded-lg" />
          <div className="w-20 h-5 left-[12.61px] top-[164.87px] absolute text-white text-xs font-bold font-['Gmarket Sans TTF']">하루의 시작</div>
          <div className="w-7 h-7 left-[102.06px] top-[12.70px] absolute" />
        </div>
        <div className="w-36 h-48 left-[162px] top-[230px] absolute">
          <div className="w-36 h-48 left-0 top-0 absolute bg-gradient-to-b from-black to-black rounded-lg" />
          <div className="w-16 h-5 left-[12.34px] top-[160px] absolute text-white text-xs font-bold font-['Gmarket Sans TTF']">비 그만..</div>
        </div>
        <div className="w-36 h-48 left-[0.94px] top-[291px] absolute">
          <div className="w-36 h-48 left-0 top-0 absolute bg-gradient-to-b from-black to-black rounded-lg" />
          <div className="w-28 h-10 left-[14.91px] top-[142.66px] absolute text-white text-xs font-bold font-['Gmarket Sans TTF']">제 하늘은 조금 달라보이지 않나요</div>
        </div>
      </div>
    </div>
  );
};

export default PhotoList;
