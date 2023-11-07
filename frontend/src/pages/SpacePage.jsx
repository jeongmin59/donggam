import React, { useSyncExternalStore } from "react";
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
import createBtn from "../assets/common/createBtn.png";
import miniLogo from "../assets/tutorial/mini-logo.svg";
import { useNavigate } from "react-router";


const SpacePage = () => {
  const navigate = useNavigate ();

  const handleButtonClick = () => {
    navigate("/space/upload"); // 클릭 시 지정한 경로로 이동
  };
  const handleLogoClick = () => {
    navigate("/"); // 클릭 시 지정한 경로로 이동
  };

  const settings = {
    // dots: true,
    infinite: false,
    speed: 500,
    slidesToShow : 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return(
    <>
      {/* <div className=""> */}
        <div className="flex justify-center my-7">
          <img 
            src={miniLogo}
            onClick={handleLogoClick}
          />
        </div>

        {/* <div className="px-5 h-[100%] flex-column align-center"> */}
        <div className="h-full py-20">
          <Slider {...settings} className="px-5">
            <div className="trace-guide">
                <div className="flex justify-center"><img src={landmarkImg} alt="" /></div>
                <SpaceButton title="근처 랜드마크 찾기" to="/space/landmark" />
            </div>
            <div className="trace-guide">
              <div className="flex-column mx-auto">
                <div className="flex justify-center"><img src={traceImg} alt="" /></div>
                <SpaceButton title="근처 방명록 찾기" to="/space/trace" />
              </div>
            </div>
            <div className="trace-guide">
              <div className="flex-column mx-auto">
                <div className="flex justify-center"><img src={myTraceImg} alt="" /></div>
                <SpaceButton title="내 방명록" />
              </div>
            </div>
          </Slider>

        </div>

        <button 
          onClick={handleButtonClick}
          className="fixed bottom-7 right-5 z-10" // 우하단에 버튼 고정
        >
          <img src={createBtn} alt="글 작성 버튼" />
        </button>

      {/* </div> */}

    </>
  );
};

export default SpacePage;