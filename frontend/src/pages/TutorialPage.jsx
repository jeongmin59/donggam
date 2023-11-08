import React from 'react';
import logo from '../assets/tutorial/mini-logo.svg'
import weather from '../assets/tutorial/1-weather.svg'
import main from '../assets/tutorial/2-main.svg'
import time from '../assets/tutorial/3-time.svg'
import space from '../assets/tutorial/4-space.svg'
import { useNavigate } from "react-router-dom";

const TutorialPage = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/profile");
  };

  return (
    <div className='px-5 bg-white'>
      <div className='mt-10 flex justify-center'>
        <img src={logo} alt="로고"/>
      </div>

      <div className="flex flex-col items-center text-center">
        <div>
          <img src={weather} alt="날씨 소개" className='mt-12 w-full'/>
          <div className='mt-6 text-md'>나와 주변 유저에 따라 달라지는 날씨! <br/> 현재 나의 기분을 표현해보세요</div>
        </div>

        <div>
          <img src={main} alt="메인 소개" className='mt-24 w-full'/>
          <div className='mt-6 text-md'>지금 이 시간, 이 공간에 함께 있는 사람과 <br /> 익명의 채팅을 나누거나 쪽지를 남겨보세요</div>
        </div>

        <div>
          <img src={time} alt="시간 소개" className='mt-24 w-full'/>
          <div className='mt-6 text-md'>같은 시간 다른 공간 사람들은 뭐 할까? <br /> 시간대에 따른 주제를 확인해보세요</div>
        </div>

        <div>
          <img src={space} alt="공간 소개" className='mt-24 w-full'/>
          <div className='mt-6 text-md'>나만 알던 공간, 사실은 만인의 아지트? <br /> 내가 다녀간 공간을 기록해보세요</div>
        </div>
      </div>
      
      <div className="mt-24 mb-6">
        <div className="w-full h-[55px] bg-white rounded-[80px] border-2 border-blue-200 justify-center items-center gap-2 inline-flex">
          <button
            className="font-['GmarketSansBold'] font-base text-blue-300"
            onClick={handleStartClick}
          >동감 시작하기</button>
        </div>
      </div>
    </div>
  );
};

export default TutorialPage;
