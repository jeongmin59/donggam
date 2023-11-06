import { useParams, useLocation } from 'react-router-dom';
import { getLandmarkGuestbook } from '../api/landmarkApi';
import { useState, useEffect } from 'react';
import LandmarkItem from "../components/landmarkpage/LandmarkItem";
import Header from '../components/common/Header';

const LandmarkDetailPage = () => {
  const location = useLocation();
  // const landmarkName = location.state ;
  const landmarkName = location.state && location.state.landmarkName;
  const { landmarkId } = useParams(); 
  const [landmarkList, setLandmarkList] = useState([]);

  useEffect(() => {
    const landmarkIdInt = parseInt(landmarkId, 10);
    getLandmarkGuestbook(landmarkIdInt)
      .then((res) => {
        setLandmarkList(res.data);
        console.log('랜드마크 방명록 조회 성공', res.data)
      })
      .catch((err) => {
        console.err('랜드마크 방명록 조회 실패', err)
      });
  },[landmarkId])

  console.log(landmarkList);
  return(
    <>
      <Header title={landmarkName} to="/" />
      <div className='px-5'>
        <ul>
        {landmarkList.map((record,index) => (
          <LandmarkItem 
            key={index} 
            time = {record.createdAt}
            content = {record.content}
            userName = {record.authorNickname}
            imageUrl = {record.imageAddress} 
          />
        ))}
        </ul>
      </div>
    </>
  );
} ;

export default LandmarkDetailPage;