import React from "react";

const TitleInput = ({ title, onTitleChange }) => {
  return (
    <div className="mt-5">
      <label className="block text-gray-700">제목을 입력하세요.</label>
      <input
        type="text"
        className="input-style"
        value={title}
        onChange={onTitleChange}
        maxLength={20}
      />
    </div>
  );
};

export default TitleInput;
