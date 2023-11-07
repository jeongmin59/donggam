import React from "react";
import landmark from "../../assets/landmark/landmark.png"

import { searchLandmark } from "../../api/landmarkApi";
import { useRecoilValue } from "recoil";
import { LatitudeAtom, LongitudeAtom } from '../../recoil/location/locationAtom';
import { useState, useEffect } from "react";
import LandmarkDetail from "./LandmarkDetail";


const FindingLandmark = () => {
  // 비동기 처리
  const [showDetail, setShowDetail] = useState(false);

  // 전역 상태의 위도, 경도 불러오기
  const latitude = useRecoilValue(LatitudeAtom);
  const longitude = useRecoilValue(LongitudeAtom);
  
  // 랜드마크 정보 
  const [landmarkName, setLandmarkName] = useState(null); 
  const [landmarkImage, setLandmarkImage] = useState(null);
  const [landmarkId, setLandmarkId] = useState(null);
  
  
  useEffect(() => {
    // 위치 정보가 변경되면 랜드마크 검색 실행
    if (latitude !== null && longitude !== null) {
      searchLandmark( latitude, longitude )
        .then((data) => {
          if (data) {
            setLandmarkName(data.data.name || "")
            setLandmarkImage(data.data.imgUrl)
            setLandmarkId(data.data.landMarkId)
          }
          console.log('랜드마크 데이터 API 응답:', data.data.name);
          console.log('랜드마크 데이터 API 응답:', data.data.landMarkId);

          setTimeout(() => {
            setShowDetail(true);
          }, 1000);
        })
        .catch((error) => {
          console.error('랜드마크 검색 실패:', error);
        });
    }
  }, [latitude, longitude]);



  return(
    <>
      {showDetail ? (
        <LandmarkDetail 
          landmarkName={landmarkName}
          landmarkImage={landmarkImage}
          landmarkId={landmarkId}
        />
      ) : (
      <div className="px-5 h-screen flex justify-center items-center bg-gradient-to-b from-sky-100 to-blue-200">
        <div className="flex flex-col items-center">
          <h3>근처에 있는 랜드마크를 찾았어요.</h3>
          <img 
            src={landmark} 
            alt="랜드마크 이미지" 
            className="w-56 h-56 mt-4"
          />
          <h2 className="mt-4">{landmarkName}</h2>
        </div>
      </div>
      )}
    </>
  );
};

export default FindingLandmark;
