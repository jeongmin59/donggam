import React from 'react';
import { useNavigate } from 'react-router-dom';
import btn from '../../assets/common/back-btn.svg';


const BackButton = ({ to }) => {
  const navigate = useNavigate();

  const navigateTo = () => {
    navigate(to);
  }

  return (
    <div className="absolute top-16 left-8 bg-white" onClick={navigateTo}>
      <img src={btn} alt="뒤로가기버튼" />
    </div>
  );
};

export default BackButton;