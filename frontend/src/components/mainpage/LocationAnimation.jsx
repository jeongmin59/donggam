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
      preserveAspectRatio: "xMidYMid meet",
    },
  }

  return (
    <div className='flex absolute mt-20' style={{ transform: 'scale(2)', zIndex: -1 }}>
      <Lottie
        options={defaultOptions} 
      />
    </div>
  )
};

export default LocationAnimation;