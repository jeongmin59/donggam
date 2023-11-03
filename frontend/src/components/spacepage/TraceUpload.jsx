import React from "react";
import UploadSpacePhoto from "./UploadSpacePhoto";
import UploadSpaceTitle from "./UploadSpaceTitle";
import UploadSpaceContent from "./UploadSpaceContent";
import UploadButton from "../common/UploadButton";

const TraceUpload = () => {

  return (
    <>
      <div className="mt-3 px-5 pb-10">
        {/* 정보나 함수 넘겨주는 건 아무것도 안돼있어용 ~. .  */}
        <UploadSpacePhoto />
        <UploadSpaceTitle title="방명록 이름을 지어주세요"/>
        <UploadSpaceContent />

        {/* UploadButton.jsx 참고해서 처리해야 합니닷 */}
        <UploadButton /> 
      </div>
    </>
  );
};

export default TraceUpload;