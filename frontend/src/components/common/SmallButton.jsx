import React from "react";

const SmallButton = ({ title, onClick }) => {
  const buttonStyle = {
    backgroundColor: "yellow",
    color: "white",
    border: "none",
    padding: "10px 20px", // 패딩을 상하 10px, 좌우 20px로 설정
  };

  return(
    <>
      <button onClick={onClick} style={buttonStyle}>
        {title}
      </button>
    </>
  );
};

export default SmallButton;