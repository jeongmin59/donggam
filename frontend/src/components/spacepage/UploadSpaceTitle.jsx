import React from "react";

const UploadSpaceTitle = ({ title, setTitle, landmarkName }) => {
  const maxTitleLimit = 15;


  const handleTitleChange = (e) => {
    const text = e.target.value;
    if (text.length <= maxTitleLimit) {
      setTitle(text);
    }
  };

  return (
    <>
      <label
        htmlFor="uploadTitle"
        className="pl-2"
      >
        방명록 이름을 지어주세요. (*최대 {maxTitleLimit}자)
      </label>
      {landmarkName ? (
        <div className="input-style text-gray-500">
          {landmarkName}
        </div>
      ) : (
        <input
          className="input-style"
          type="text"
          id="uploadTitle"
          placeholder="예시) 불꽃축제 숨은 명당"
          value={title}
          onChange={handleTitleChange}
        />
      )}
    </>
  );
};

export default UploadSpaceTitle;