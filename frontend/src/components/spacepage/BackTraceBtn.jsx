import React from 'react';
import { useNavigate } from 'react-router-dom';
import circleBtn from '../../assets/icons/circle-back-btn.svg';

const BackTraceBtn = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="fixed top-4 left-4 z-50">
      <img src={circleBtn} alt="뒤로가기 버튼" onClick={handleGoBack} />
    </div>
  );
};

export default BackTraceBtn;