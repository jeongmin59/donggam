import React, { useState } from "react";
import UploadSpacePhoto from "./UploadSpacePhoto";
import UploadSpaceTitle from "./UploadSpaceTitle";
import UploadSpaceContent from "./UploadSpaceContent";
import UploadButton from "../common/UploadButton";
import { useRecoilValue } from "recoil";
import { LatitudeAtom, LongitudeAtom } from '../../recoil/location/locationAtom';
import { postTrace } from '../../api/spaceApi';



const TraceUpload = () => {
  // 여기서 업로드 axios 요청을 해야함
  // 사진, 제목, 내용 중 하나라도 있으면 요청 가능!

  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [image, setImage] = useState(null);

  // 전역 상태의 위도, 경도 불러오기
  const latitude = useRecoilValue(LatitudeAtom);
  const longitude = useRecoilValue(LongitudeAtom);

  // 방명록 등록 axios 호출
  const handlePostTrace = async () => {
    try {
      const traceData = {
        title: title,
        content: content,
        latitude: latitude,
        longitude: longitude,
        imageFile: image,
      };
      const response = await postTrace(traceData);
      console.log("방명록 작성 완료:", response);
    } catch (error) {
      console.error("방명록 작성 실패:", error);
    }
  };

  return (
    <>
      <div className="mt-3 px-5 pb-10">
        <UploadSpacePhoto image={image} setImage={setImage} />
        <UploadSpaceTitle title={title} setTitle={setTitle} />
        <UploadSpaceContent content={content} setContent={setContent} />
        <UploadButton onUpload={handlePostTrace} />
      </div>
    </>
  );
};

export default TraceUpload;