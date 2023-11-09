import React from "react";
// import SpaceHeaderTemplate from "../components/spacepage/SpaceHeaderTemplate";
// import ButtonTemplate from "../components/spacepage/ButtonTemplate";
// import MyTrace from "../components/spacepage/MyTrace";
// import Header from "../components/common/Header"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import landmarkImg from "../assets/images/landmark-img.svg"
import traceImg from "../assets/images/trace-img.svg"
import myTraceImg from "../assets/images/my-trace-img.svg"
import SpaceButton from "../components/common/SpaceButton";
// import createBtn from "../assets/common/createBtn.png";
import miniLogo from "../assets/tutorial/mini-logo.svg";
import CreateButton from './../components/common/CreateButton';
import { useNavigate } from "react-router";
import NavBar from "../components/common/NavBar";


const SpacePage = () => {
  const navigate = useNavigate();


  const handleLogoClick = () => {
    navigate("/"); // 클릭 시 지정한 경로로 이동
  };


  const settings = {
    // dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
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

        <div className="h-[75%] flex justify-center items-center">
        {/* <div className="mt-5 mb-20 px-5"> */}
          <Slider {...settings} className="carousel p-8 mx-auto">
            <div className="trace-guide ">
              <div className="flex justify-center"><img src={landmarkImg} /></div>
              <SpaceButton title="근처 랜드마크 찾기" to="/space/landmark" />
            </div>
            <div className="trace-guide">
              <div className="flex justify-center"><img src={traceImg} /></div>
              <SpaceButton title="근처 방명록 찾기" to="/space/trace" />
            </div>
            <div className="trace-guide">
              <div className="flex justify-center"><img src={myTraceImg} /></div>
              <SpaceButton title="내 방명록" to="/mytrace" />
            </div>
          </Slider>
        </div>

        <NavBar />

        <CreateButton to='/space/upload' />
      </div>

    </>
  );
};

export default SpacePage;
