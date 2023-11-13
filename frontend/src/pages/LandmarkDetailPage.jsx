import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getLandmarkGuestbook } from '../api/landmarkApi';
import LandmarkItem from '../components/landmarkpage/LandmarkItem';
import Header from '../components/common/Header';
import CreateButton from '../components/common/CreateButton';

const LandmarkDetailPage = () => {
  const location = useLocation();
  const landmarkName = location.state && location.state.landmarkName;
  const { landmarkId } = useParams();
  const navigate = useNavigate();
  const [landmarkList, setLandmarkList] = useState([]);
  const [selectedLandmark, setSelectedLandmark] = useState(landmarkName);

  const landmarks = [
    'SSAFY 서울 캠퍼스',
    'SSAFY 대전 캠퍼스',
    'SSAFY 광주 캠퍼스',
    'SSAFY 구미 캠퍼스',
    'SSAFY 부울경 캠퍼스',
  ];

  useEffect(() => {
    const landmarkIdInt = parseInt(landmarkId, 10);
    getLandmarkGuestbook(landmarkIdInt)
      .then((res) => {
        setLandmarkList(res.data);
      })
      .catch((err) => {
        console.error('랜드마크 방명록 조회 실패', err);
      });
  }, [landmarkId, landmarkName]);

  const handleLandmarkChange = (newLandmark) => {
    setSelectedLandmark(newLandmark);
    // 새로운 랜드마크에 대한 데이터를 가져오는 등의 추가적인 로직이 필요하다면 여기에 작성

    // 새로운 랜드마크에 해당하는 URL로 이동
    navigate(`/space/landmark/${landmarks.indexOf(newLandmark) + 1}`);
  };

  return (
    <>
      <div className="bg-white h-screen">
        <Header title={selectedLandmark} to="/space/" />
        <div className="px-5 pt-5 overflow-y-auto h-full max-h-[calc(100vh-100px)]">
          <div>
            <div className='flex justify-between'>
              <label 
                htmlFor="landmarkSelector"
                className='text-[14px]'>
              </label>
              <select
                id="landmarkSelector"
                onChange={(e) => handleLandmarkChange(e.target.value)}
                value={selectedLandmark}
                className='landmark-selector '
              >
                {landmarks.map((landmark) => (
                  <option key={landmark} value={landmark}>
                    {landmark}
                  </option>
                ))}
              </select>
            </div>

            <ul>
              {landmarkList.map((record, index) => (
                <LandmarkItem
                  key={index}
                  time={record.createdAt}
                  content={record.content}
                  userName={record.authorNickname}
                  imageUrl={record.imageAddress}
                />
              ))}
            </ul>

            {landmarkName === selectedLandmark && (
              <CreateButton to="/space/upload" />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LandmarkDetailPage;
