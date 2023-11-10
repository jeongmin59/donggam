import React from "react";
import { useNavigate } from "react-router-dom";
import createBtn from "../../assets/common/createBtn.png";

const CreateBtn = ({ to }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(to); // 클릭 시 지정한 경로로 이동
  };

  return (
    <img src={createBtn} alt="글 작성 버튼" onClick={handleButtonClick}
      className="p-2 bottom-[80px] right-5 fixed" />
  );
};

export default CreateBtn;
