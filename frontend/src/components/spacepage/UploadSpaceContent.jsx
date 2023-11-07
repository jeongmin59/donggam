import React, { useState } from "react";

const UploadSpaceContent = ({ content, setContent }) => {
  const maxCharacterLimit = 60;

  const handleContentChange = (e) => {
    const text = e.target.value;
    if (text.length <= maxCharacterLimit) {
      setContent(text);
    }
  }
  return (
    <>
      <label className="pl-2">
        방명록을 작성해주세요(*최대 60글자)
      </label>
      <textarea
        className="input-style"
        type="text"
        id="uploadContent"
        value={content}
        placeholder="예시) 나만 알고 싶은 추억의 공간!"
        onChange={handleContentChange}

      />
    </>
  );
};

export default UploadSpaceContent;