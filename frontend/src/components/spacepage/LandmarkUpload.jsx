import React, { useState, useEffect } from "react";
import UploadSpacePhoto from "./UploadSpacePhoto";
import UploadSpaceTitle from "./UploadSpaceTitle";
import UploadSpaceContent from "./UploadSpaceContent";
import UploadButton from "../common/UploadButton";
import { getLocationInfo } from "../common/GetLocationInfo";
import { searchLandmark } from "../../api/landmarkApi";

const LandmarkUpload = () => {
  // 위치 정보
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [landmarkName, setLandmarkName] = useState(null); 

  // 위도 경도 전송
  const handleLocationChange = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  }
  useEffect(() => {
    getLocationInfo(handleLocationChange);
  }, []);

  useEffect(() => {
    // 위치 정보가 변경되면 랜드마크 검색 실행
    if (latitude !== null && longitude !== null) {
      searchLandmark( latitude, longitude )
        .then((data) => {
          if (data) {
            setLandmarkName(data.data.name || "")
          }
          console.log('랜드마크 데이터 API 응답:', data.data.name);
        })
        .catch((error) => {
          console.error('랜드마크 검색 실패:', error);
        });
    }
  }, [latitude, longitude]);

  return(
    <>
      <div className="mt-3 px-5 pb-10">
        {/* 정보나 함수 넘겨주는 건 아무것도 안돼있어용 ~. .  */}
        <UploadSpacePhoto />
        <UploadSpaceTitle 
          title="근처 랜드마크를 선택해주세요"
          landmarkName={landmarkName} 
          />
        <UploadSpaceContent />

        {/* UploadButton.jsx 참고해서 처리해야 합니닷 */}
        <UploadButton /> 
      </div>
    </>
  );
};

export default LandmarkUpload;