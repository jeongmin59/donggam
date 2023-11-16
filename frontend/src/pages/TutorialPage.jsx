import React from 'react';
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import tutorial1 from '../assets/tutorial/tutorial-1.png'
import tutorial2 from '../assets/tutorial/tutorial-2.png'
import tutorial3 from '../assets/tutorial/tutorial-3.png'
import tutorial4 from '../assets/tutorial/tutorial-4.png'
import tutorial5 from '../assets/tutorial/tutorial-5.png'
import tutorial6 from '../assets/tutorial/tutorial-6.png'
import tutorial7 from '../assets/tutorial/tutorial-7.png'

const TutorialPage = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate("/profile");
  };
  // 커스텀 화살표 컴포넌트
  const CustomPrevArrow = (props) => (
    <div
      {...props}
      style={{
        width: "50px", // 화살표의 너비 설정
        height: "50px", // 화살표의 높이 설정
        left: "20px", // 왼쪽 위치 조정
        zIndex: 1, // z-index 설정하여 슬라이더 내용 위로 표시
      }}
    >
      {/* 커스텀 화살표 내용 */}
      <span className='text-red-500'>이전</span>
    </div>
  );

  const CustomNextArrow = (props) => (
    <div
      {...props}
      style={{
        width: "50px", // 화살표의 너비 설정
        height: "50px", // 화살표의 높이 설정
        right: "-10px", // 오른쪽 위치 조정
        zIndex: 1, // z-index 설정하여 슬라이더 내용 위로 표시
      }}
    >
      {/* 커스텀 화살표 내용 */}
      <span>다음</span>
    </div>
  );

  const settings = {
    // dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true, // 중앙 정렬을 위해 추가
    centerPadding: '0', // 중앙 정렬을 위해 추가
    cssEase: 'linear', // 중앙 정렬을 위해 추가
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };
  

  return (
    <div className='bg-white h-screen '>
      <Slider {...settings}>
        <div className='tutorial-style'>
          <div className='tutorial-text'>
            <h2>감정에 따라 달라지는 날씨</h2>
            <p>주변 유저들의 상태에 따라<br/>현재 공간의 감정 날씨가 바뀌어요</p>
          </div>
          <img src={tutorial1} className='tutorial-img'/>
        </div>

        <div className='tutorial-style'>
          <div className='tutorial-text'>
            <h2>위치 기반 실시간 소통</h2>
            <p>주변에 있는 가까운 유저에게<br/>채팅이나 쪽지를 남겨보세요!</p>
          </div>
          <img src={tutorial2} className='tutorial-img'/>
        </div>

        <div className='tutorial-style'>
          <div className='tutorial-text'>
            <h2>감정에 따라 받은 메시지</h2>
            <p>가까운 듯 멀리 있는 사람에게 받은<br/>소중한 응원 메시지를 간직하세요</p>
          </div>
          <img src={tutorial3} className='tutorial-img'/>
        </div>

        <div className='tutorial-style'>
          <div className='tutorial-text'>
            <h2>같은 시간 다른 공간</h2>
            <p>지금 이 시간, 다른 사람들은 뭐 할까?<br/>시간대별로 열리는 사진 콘테스트  </p>
          </div>
          <img src={tutorial4} className='tutorial-img'/>
        </div>

        <div className='tutorial-style'>
          <div className='tutorial-text'>
            <h2>같은 공간 다른 시간</h2>
            <p>나만 알던 공간, 사실은 만인의 장소?!<br/>내가 다니는 곳에 누가 흔적을 남겼을까</p>
          </div>
          <img src={tutorial5} className='tutorial-img'/>
        </div>

        <div className='tutorial-style'>
          <div className='tutorial-text'>
            <h2>지금 여기, 랜드마크</h2>
            <p>유명한 랜드마크에 방문하여<br/>사람들이 남긴 방명록을 확인하세요</p>
          </div>
          <img src={tutorial6} className='tutorial-img'/>
        </div>

        <div className='tutorial-style'>
          <div className='tutorial-text'>
            <h2>동감 시작하기</h2>
            <button
              className="font-['GmarketSansBold'] text-blue-300"
              onClick={handleStartClick}
            >Click Me!</button>
          </div>
          <img src={tutorial7} className='tutorial-img'/>
        </div>

      </Slider>
    </div>
    // <div className='px-5 bg-white'>
    //   <div className='pt-10 flex justify-center'>
    //     <img src={logo} alt="로고"/>
    //   </div>

    //   <div className="flex flex-col items-center text-center">
    //     <div>
    //       <img src={weather} alt="날씨 소개" className='mt-12 w-full'/>
    //       <div className='mt-6 text-md'>나와 주변 유저에 따라 달라지는 날씨! <br/> 현재 나의 기분을 표현해보세요</div>
    //     </div>

    //     <div>
    //       <img src={main} alt="메인 소개" className='mt-24 w-full'/>
    //       <div className='mt-6 text-md'>지금 이 시간, 이 공간에 함께 있는 사람과 <br /> 익명의 채팅을 나누거나 쪽지를 남겨보세요</div>
    //     </div>

    //     <div>
    //       <img src={time} alt="시간 소개" className='mt-24 w-full'/>
    //       <div className='mt-6 text-md'>같은 시간 다른 공간 사람들은 뭐 할까? <br /> 시간대에 따른 주제를 확인해보세요</div>
    //     </div>

    //     <div>
    //       <img src={space} alt="공간 소개" className='mt-24 w-full'/>
    //       <div className='mt-6 text-md'>나만 알던 공간, 사실은 만인의 아지트? <br /> 내가 다녀간 공간을 기록해보세요</div>
    //     </div>
    //   </div>
      
    //   <div className="mt-24 mb-6">
    //     <div className="w-full h-[55px] bg-white rounded-[80px] border-2 border-blue-200 justify-center items-center gap-2 inline-flex">
          // <button
          //   className="font-['GmarketSansBold'] font-base text-blue-300"
          //   onClick={handleStartClick}
          // >동감 시작하기</button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default TutorialPage;
