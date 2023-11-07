import React from "react";
// import SpaceHeaderTemplate from "../components/spacepage/SpaceHeaderTemplate";
// import ButtonTemplate from "../components/spacepage/ButtonTemplate";
// import MyTrace from "../components/spacepage/MyTrace";
// import Header from "../components/common/Header"
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
import landmarkImg from "../assets/images/landmark-img.svg"
import traceImg from "../assets/images/trace-img.svg"
import myTraceImg from "../assets/images/my-trace-img.svg"
import SpaceButton from "../components/common/SpaceButton";
import CreateButton from './../components/common/CreateButton';


const SpacePage = () => {

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <>
      <div>동감로고</div>
      {/* <div className="px-5 h-[100%] flex-column align-center"> */}
      {/* <Slider {...settings} className="px-5"> */}
      <div className="trace-guide">
        <div className="flex-column mx-auto">
          <div className="flex justify-center"><img src={landmarkImg} alt="" /></div>
          <SpaceButton title="근처 랜드마크 찾기" to="/space/landmark" />
        </div>
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
          <SpaceButton title="내 방명록" to='/mytrace' />
        </div>
      </div>
      {/* </Slider> */}
      <CreateButton to='/space/upload' />

    </>
  );
};

export default SpacePage;