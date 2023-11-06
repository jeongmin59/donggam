import React from "react";
import { useNavigate } from "react-router-dom";
import BackBtn from "../../assets/icons/BackBtn.svg";

const BackButton = ({ to }) => {
  const navigate = useNavigate();

  const navigateTo = () => {
    navigate(to);
  }

  return(
    <>
      <div onClick={navigateTo}>
        <img src={BackBtn} alt="뒤로가기버튼"/>
      </div>
    </>
  )
}

export default BackButton;