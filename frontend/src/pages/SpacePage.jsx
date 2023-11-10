import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import landmarkImg from "../assets/images/landmark-img.svg"
import traceImg from "../assets/images/trace-img.svg"
import myTraceImg from "../assets/images/my-trace-img.svg"
import SpaceButton from "../components/common/SpaceButton";
import miniLogo from "../assets/tutorial/mini-logo.svg";
import { useNavigate } from "react-router";
import NavBar from "../components/common/NavBar";

const SpacePage = () => {
  const navigate = useNavigate();


  const handleLogoClick = () => {
    navigate("/"); // 클릭 시 지정한 경로로 이동
  };


  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true, // 중앙 정렬을 위해 추가
    centerPadding: '0', // 중앙 정렬을 위해 추가
    cssEase: 'linear', // 중앙 정렬을 위해 추가
  };

  return (
    <>
      <div className="bg-white h-screen">
        <div className="logo flex justify-center pt-[10%]">
          <img
            src={miniLogo}
            onClick={handleLogoClick}
          />
        </div>

        <div className="h-[70%] flex justify-center items-center px-8 pt-8">
          {/* <div className="mt-5 mb-20 px-5"> */}
          <Slider {...settings} className="carousel">
            <div className="trace-guide">
              <div className="flex justify-center">
                <img src={landmarkImg} style={{ width: '80%' }} />
              </div>
              <SpaceButton title="근처 랜드마크 찾기" to="/space/landmark" />
            </div>

            <div className="trace-guide">
              <div className="flex justify-center">
                <img src={traceImg} style={{ width: '80%' }} />
              </div>
              <SpaceButton title="근처 방명록 찾기" to="/space/trace" />
            </div>

            <div className="trace-guide">
              <div className="flex justify-center">
                <img src={myTraceImg} style={{ width: '80%' }} />
              </div>
              <SpaceButton title="내 방명록" to="/mytrace" />
            </div>
          </Slider>
        </div>
        <NavBar />
      </div>
    </>
  );
};

export default SpacePage;
