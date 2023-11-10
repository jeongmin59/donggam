import { useParams, useLocation } from 'react-router-dom';
import { getLandmarkGuestbook } from '../api/landmarkApi';
import { useState, useEffect } from 'react';
import LandmarkItem from "../components/landmarkpage/LandmarkItem";
import Header from '../components/common/Header';
import { useNavigate } from 'react-router-dom';
import CreateButton from '../components/common/CreateButton';
// import NavBar from '../components/common/NavBar';

const LandmarkDetailPage = () => {
  const location = useLocation();
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

  console.log('랜드마크 방명록',landmarkList);
  return(
    <>
      <div className='bg-white h-screen'>
        <Header title={landmarkName} to="/space/" />
        <div className='px-5 pt-5 overflow-y-auto max-h-[calc(100vh-160px)]'>
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
        <CreateButton to='/space/upload' />
        {/* <NavBar /> */}
      </div>
    </>
  );
} ;

export default LandmarkDetailPage;