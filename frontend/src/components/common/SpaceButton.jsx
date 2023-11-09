import React from "react";
import { useNavigate } from "react-router";

const SpaceButton = ({ title, to}) => {
  const navigate = useNavigate()
  const navigateTo = () => {
    navigate(to);
  }

  return(
    <>
      <div className="px-7">
        <button 
          onClick={navigateTo} 
          className="w-[100%] px-[12px] py-[10px] rounded-[100px] bg-subColor text-white">
          {title}
        </button>

      </div>
    </>
  );
};

export default SpaceButton;