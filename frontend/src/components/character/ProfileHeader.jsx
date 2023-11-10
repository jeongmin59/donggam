import React from "react";

const ProfileHeader = ({ title, onConfirmClick }) => {
  return (
    <div className="header w-100 h-[100px] flex justify-between items-center pt-[30px] relative shadow-md">
      <h2 className="ml-12 text-center text-black flex-1">{title}</h2>
      <button onClick={onConfirmClick} className="mr-6">확인</button>
    </div>
  );
};

export default ProfileHeader;
