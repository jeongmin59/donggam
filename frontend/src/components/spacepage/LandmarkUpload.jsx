import React, { useState, useEffect } from "react";
import UploadSpacePhoto from "./UploadSpacePhoto";
import UploadSpaceTitle from "./UploadSpaceTitle";
import UploadSpaceContent from "./UploadSpaceContent";
import UploadButton from "../common/UploadButton";
// import { getLocationInfo } from "../common/GetLocationInfo";
import { searchLandmark } from "../../api/landmarkApi";
import { useRecoilValue } from "recoil";
import { LatitudeAtom, LongitudeAtom } from '../../recoil/location/locationAtom';
import { postLandmark } from '../../api/landmarkApi';
import { useNavigate } from 'react-router-dom';

const LandmarkUpload = () => {
  const navigate = useNavigate();
  // 전역 상태의 위도, 경도 불러오기
  const latitude = useRecoilValue(LatitudeAtom);
  const longitude = useRecoilValue(LongitudeAtom);

  // 랜드마크 정보 
  const [landmarkName, setLandmarkName] = useState(null);
  const [landmarkContent, setLandmarkContent] = useState(null);
  const [landmarkImage, setLandmarkImage] = useState(null);
  const [landmarkId, setLandmarkId] = useState(null);


  useEffect(() => {
    // 위치 정보가 변경되면 랜드마크 검색 실행
    if (latitude !== null && longitude !== null) {
      searchLandmark(latitude, longitude)
        .then((data) => {
          if (data) {
            setLandmarkName(data.data.name || "")
            setLandmarkId(data.data.landMarkId)
          }
          console.log('랜드마크 데이터 API 응답:', data.data.name);
          console.log('랜드마크 데이터 API 응답:', data.data.landMarkId);
        })
        .catch((error) => {
          console.error('랜드마크 검색 실패:', error);
        });
    }
  }, [latitude, longitude]);

  const handlePostLandmark = async () => {
    try {
      if (landmarkId && (landmarkContent || landmarkImage)) {
        const res = await postLandmark(landmarkId, landmarkContent, landmarkImage);
        console.log('랜드마크 방명록 작성 완료', res);
        navigate(`/space/landmark/${landmarkId}`);
      }
    } catch (err) {
      console.error('랜드마크 방명록 작성 실패', err)
    }
  }


  return (
    <>
      <div className="mt-3 px-5 pb-10">
        <UploadSpacePhoto image={landmarkImage} setImage={setLandmarkImage} />
        <UploadSpaceTitle
          title="근처 랜드마크를 선택해주세요"
          landmarkName={landmarkName}
        />
        <UploadSpaceContent content={landmarkContent} setContent={setLandmarkContent} textLength={60} />

        {/* UploadButton.jsx 참고해서 처리해야 합니닷 */}
        <UploadButton onUpload={handlePostLandmark} />
      </div>
    </>
  );
};

export default LandmarkUpload;