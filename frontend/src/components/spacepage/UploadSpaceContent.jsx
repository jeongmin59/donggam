import React from "react";

const UploadSpaceContent = () => {
  return(
    <>
      <label className="pl-2">
        해당 장소와 관련된 방명록을 작성해주세요
      </label>
      <textarea
          type="text"
          placeholder="나만 알고 싶은 추억의 공간!"
          className="input-style"
      />    
    </>
  );
};

export default UploadSpaceContent;