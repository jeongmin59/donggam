import React from "react";

const UploadSpaceTitle = ({ title, setTitle }) => {
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <>
      <label
        htmlFor="uploadTitle"
        className="pl-2"
      >
        방명록 이름을 지어주세요.
      </label>
      <input
        className="input-style"
        type="text"
        id="uploadTitle"
        placeholder="예시) 불꽃축제 숨은 명당"
        value={title}
        onChange={handleTitleChange}
      />
    </>
  );
};

export default UploadSpaceTitle;