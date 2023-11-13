import React, { useState, useEffect } from "react";
import Lottie from "react-lottie";
import landmarkImg from "../../assets/images/landmark-img.svg";
import landmarkNoImg from "../../assets/images/landmark-no-img.svg";
import { searchLandmark } from "../../api/landmarkApi";
import { useRecoilValue } from "recoil";
import { LatitudeAtom, LongitudeAtom } from '../../recoil/location/locationAtom';
import LandmarkDetail from "./LandmarkDetail";
import { useNavigate } from "react-router";
import loadingAnimation from "../../assets/animation/loading-animation.json";

const FindingLandmark = () => {
  const navigate = useNavigate();

  // 비동기 처리
  const [showDetail, setShowDetail] = useState(false);
  const [loading, setLoading] = useState(true);

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
      searchLandmark(latitude, longitude)
        .then((data) => {
          if (data) {
            setLandmarkName(data.data.name || "");
            setLandmarkImage(data.data.imgUrl);
            setLandmarkId(data.data.landMarkId);
          }

          setTimeout(() => {
            setLoading(false);
            setTimeout(() => {
              setShowDetail(true);
            }, 2000);
          }, 2500);
        })
        .catch((error) => {
          setTimeout(() => {
            navigate("/");
          }, 1000);
        });
    }
  }, [latitude, longitude, navigate]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen bg-white">
          <div className="flex-col">
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: loadingAnimation,
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice",
                },
              }}
              height={200}
              width={300}
            />
            <div className="text-[14px] text-blue-300 text-center">
              랜드마크를 찾고 있어요
            </div>

          </div>
        </div>
      ) : (
        <div>
          {showDetail ? (
            <LandmarkDetail
              landmarkName={landmarkName}
              landmarkImage={landmarkImage}
              landmarkId={landmarkId}
            />
          ) : (
            <div>
              {landmarkName ? (
                <div className="landmark-yes flex-col">
                  <h3>근처에 있는 랜드마크를 찾았어요.</h3>
                  <div className="flex justify-center"><img src={landmarkImg} alt="" /></div>
                  <h2 className="mt-4">{landmarkName}</h2>
                </div>
              ) : (
                <div className="landmark-no flex-col">
                  <h3>근처에 있는 랜드마크가 없어요😥</h3>
                  <div className="flex justify-center"><img src={landmarkNoImg} alt="" /></div>
                  <h3 className="mt-4">랜드마크는 추후 업데이트됩니다</h3>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FindingLandmark;
