// import { useEffect } from "react";
import Lottie from "react-lottie"
import animationData from "../../assets/animation/location-animation.json";

const LocationAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      // 너비 설정
      // preserveAspectRatio: "xMidYMid slice",
    },
  }

  return (
    <>
      <Lottie
        options={defaultOptions} 
      />
    </>
  )
};

export default LocationAnimation;