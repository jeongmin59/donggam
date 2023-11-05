import React from "react";

const UploadSpaceContent = ({ content, setContent }) => {
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <>
      <label className="pl-2">
        해당 장소와 관련된 방명록을 작성해주세요
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