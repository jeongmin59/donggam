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

  const errorCallback = () => {
    console.log("401에러 발생");
    const confirm = window.confirm('다시 로그인 해주세요.');
    if (confirm) {
      navigate('/login');
    }
  }

  useEffect(() => {
    const landmarkIdInt = parseInt(landmarkId, 10);
    getLandmarkGuestbook(landmarkIdInt, errorCallback)
      .then((res) => {
        setLandmarkList(res.data);
        console.log('랜드마크 방명록 조회 성공', res.data)
      })
      .catch((err) => {
        console.err('랜드마크 방명록 조회 실패', err)
      });
  },[landmarkId])

  console.log('랜드마크 방명록',landmarkList);
  return(
    <>
      <Header title={landmarkName} to="/space/" />
      <div className='px-5 pt-5'>
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