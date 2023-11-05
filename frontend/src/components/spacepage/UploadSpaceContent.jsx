import React, { useState } from "react";

const UploadSpaceContent = () => {
  // 랜드마크
  const [content, setContent] = useState("");
  const maxCharacterLimit = 60;

  const handleContentChange = (e) => {
    const text = e.target.value;
    if (text.length <= maxCharacterLimit) {
      setContent(text);
    }
  }
  return(
    <>
      <label className="pl-2">
        방명록을 작성해주세요(*최대 60글자)
      </label>
      <textarea
          type="text"
          placeholder="나만 알고 싶은 추억의 공간!"
          className="input-style"
          value={content}
          onChange={handleContentChange}
      />    
    </>
  );
};

export default UploadSpaceContent;