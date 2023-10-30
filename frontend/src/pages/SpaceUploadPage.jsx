import React from "react";
import Header from "../components/common/Header";
import TraceUpload from "../components/upload/TraceUpload";

const SpaceUploadpage = () => {
  return (
    <>
      <Header title="방명록 등록하기" to="/space"/>
      <TraceUpload />
    </>
  );
};

export default SpaceUploadpage;