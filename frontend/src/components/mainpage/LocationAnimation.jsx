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
      preserveAspectRatio: "xMidYMid slice",
    },
  }

  return (
    <div className="flex justify-center">
      <Lottie
        options={defaultOptions} 
        className="absolute top-20"
        style={{ width: "120%", zIndex: -1 }}
      />
    </div>
  )
};

export default LocationAnimation;