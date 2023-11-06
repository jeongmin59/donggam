import { useParams } from 'react-router-dom';

const LandmarkDetailPage = () => {
  const { landmarkId } = useParams(); 

  return(
    <>
      <div>{landmarkId}</div>
      여기임
    </>
  );
} ;

export default LandmarkDetailPage;