import React from "react";

const UploadSpaceTitle = ({title}) => {
  return(
    <>
      <label 
        htmlFor="uploadTitle"
        className="pl-2"
      >
        {title}
      </label>
      <input
        className="input-style"
        type="text"
        id="uploadTitle"
        placeholder="불꽃축제 숨은 명당"
      />    
    </>
  );
};

export default UploadSpaceTitle;