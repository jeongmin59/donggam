import React from "react";

const TitleInput = ({ title, onTitleChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm text-gray-700">제목을 입력하세요.</label>
      <input
        type="text"
        className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
        value={title}
        onChange={onTitleChange}
      />
    </div>
  );
};

export default TitleInput;
