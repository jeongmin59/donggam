import React from 'react';
import { useNavigate } from 'react-router-dom';
import circleBtn from '../../assets/icons/circle-back-btn.svg'
import blackBtn from '../../assets/icons/black-back-btn.svg'

const BackButton = ({ to, type }) => {
  const navigate = useNavigate();

  // type을 'black'으로 명시하면 검정색 > 버튼 이미지로 되고 type 지정하지 않으면 circle 이미지 버튼이 생성됩니다. 
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