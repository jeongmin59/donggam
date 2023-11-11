import React from "react";

const SmallButton = ({ title, onClick }) => {
  return(
    <>
      <button 
        onClick={onClick} 
        className="w-[100%] px-[12px] py-[10px] rounded-[100px] bg-mainColor">
        {title}
      </button>
    </>
  );
};

export default SmallButton;