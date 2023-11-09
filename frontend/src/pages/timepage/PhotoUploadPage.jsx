import React from "react";
import PhotoUpload from "../../components/timepage/PhotoUpload";
import Header from '../../components/common/Header';

const PhotoUploadpage = () => {

  return (
    <>
      <Header title="사진 업로드" to="/time" />
      <div className="pt-6 bg-white">
        <PhotoUpload />
      </div>
    </>
  );
};

export default PhotoUploadpage;
