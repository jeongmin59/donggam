import React, { useState } from "react";
import { useNavigate } from "react-router";
import UploadSpacePhoto from "./UploadSpacePhoto";
import UploadSpaceTitle from "./UploadSpaceTitle";
import UploadSpaceContent from "./UploadSpaceContent";
import { useRecoilValue } from "recoil";
import { LatitudeAtom, LongitudeAtom } from '../../recoil/location/locationAtom';
import { postTrace } from '../../api/spaceApi';
import ToastModal from './../common/ToastModal';

const TraceUpload = () => {
  const navigator = useNavigate();

  const [title, setTitle] = useState('');
  // console.log(title)
  const [content, setContent] = useState(null);
  const [image, setImage] = useState(null);
  const latitude = useRecoilValue(LatitudeAtom);
  const longitude = useRecoilValue(LongitudeAtom);

  // 토스트 모달 관련
  const [showToast, setShowToast] = useState(false);

  const handleToastOpen = () => {
    setShowToast(true);
  };


  const handlePostTrace = async () => {
    try {
      if ((title.length > 2)) {
        const traceData = {
          title: title,
          content: content,
          latitude: latitude,
          longitude: longitude,
          imageFile: image,
        };
        const res = await postTrace(traceData);
        console.log("방명록 작성 완료:", res);
        navigator('/mytrace')
      }
      else {
        handleToastOpen();
      }
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
        <button
          onClick={handlePostTrace}
          className="w-full h-[55px] bg-white rounded-[80px] border-2 border-blue-200 justify-center items-center gap-[12.28px] inline-flex  font-base text-blue-200 "
        >업로드</button>
      </div>
      {showToast && <ToastModal message="제목을 3자 이상 입력해주세요." onClose={() => setShowToast(false)} />}
    </>
  );
};

export default TraceUpload;
