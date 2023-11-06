import React from "react";
import NavigateButton from './../common/NavigateButton';

const ButtonTemplate = () => {
  return (
    <div className="px-5 fixed bottom-3 left-0 right-0">
      <NavigateButton content="근처 방명록 보기" to="/space/trace" />
      <NavigateButton content="랜드마크 보기" to="/space/landmark" />
      <NavigateButton content="내 방명록 보기" to="/mytrace" />
    </div>
  );
};

export default ButtonTemplate;