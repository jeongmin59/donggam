import React, { useState } from "react";
import UploadSpacePhoto from "./UploadSpacePhoto";
import UploadSpaceTitle from "./UploadSpaceTitle";
import UploadSpaceContent from "./UploadSpaceContent";
import UploadButton from "../common/UploadButton";
import { useRecoilValue } from "recoil";
import { LatitudeAtom, LongitudeAtom } from '../../recoil/location/locationAtom';
import { postTrace } from '../../api/spaceApi';
import ToastModal from './../common/ToastModal';

const TraceUpload = () => {
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [image, setImage] = useState(null);
  const latitude = useRecoilValue(LatitudeAtom);
  const longitude = useRecoilValue(LongitudeAtom);

  const handlePostTrace = async () => {
    try {
      const traceData = {
        title: title,
        content: content,
        latitude: latitude,
        longitude: longitude,
        imageFile: image,
      };
      const res = await postTrace(traceData);
      console.log("방명록 작성 완료:", res);
    } catch (err) {
      console.error("방명록 작성 실패:", err);
    }
  };

  return (
    <>
      <div className="mt-3 px-5 pb-10">
        <UploadSpacePhoto image={image} setImage={setImage} />
        <UploadSpaceTitle title={title} setTitle={setTitle} />
        <UploadSpaceContent content={content} setContent={setContent} textLength={240} />
        <UploadButton onUpload={handlePostTrace} to='/mytrace' />
      </div>
    </>
  );
};

export default TraceUpload;
