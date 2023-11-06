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
      className="header w-100 h-[60px] flex justify-center items-center pt-[12px] relative shadow-md">
      < div className="absolute left-5" onClick={navigateTo}>
        <img src={btn} alt="뒤로가기버튼" />
      </div>
    </div >
  );
};


export default BackButton;