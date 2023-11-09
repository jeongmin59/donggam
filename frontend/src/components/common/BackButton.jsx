import React from 'react';
import { useNavigate } from 'react-router-dom';
import circleBtn from '../../assets/icons/circle-back-btn.svg'
import blackBtn from '../../assets/icons/black-back-btn.svg'

const BackButton = ({ to, type }) => {
  const navigate = useNavigate();

  const getButtonType = () => {
    return type === 'black' ? blackBtn : circleBtn;
  };


  const navigateTo = () => {
    navigate(to);
  }

  return (
    <div
      className="fixed top-4 left-4 z-50">
      <img src={getButtonType()} alt="뒤로가기버튼" onClick={navigateTo} />
    </div >
  );
};


export default BackButton;