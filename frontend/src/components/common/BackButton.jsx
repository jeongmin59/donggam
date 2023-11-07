import React from 'react';
import { useNavigate } from 'react-router-dom';
import btn from '../../assets/common/back-btn.svg';

const BackButton = ({ to }) => {
  const navigate = useNavigate();

  const navigateTo = () => {
    navigate(to);
  }

  return (
    <div
      className="fixed top-4 left-4">
      <img src={btn} alt="뒤로가기버튼" onClick={navigateTo} />
    </div >
  );
};


export default BackButton;