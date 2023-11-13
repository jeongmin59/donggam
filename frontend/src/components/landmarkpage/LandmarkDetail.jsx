import moreBtn from "../../assets/icons/more-btn.svg";
import { useNavigate } from "react-router";
import BackButton from "../common/BackButton";
// import BackBtn from "../../assets/icons/BackBtn.svg"



const LandmarkDetail = ({ landmarkName, landmarkImage, landmarkId }) => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate(`/space/landmark/${landmarkId}`, { state: { landmarkName } }); // 클릭 시 지정한 경로로 이동
  };

  return (
    <>
      <div
        className="trace-image"
        style={{ backgroundImage: `url(${landmarkImage})`, zIndex: 2 }}
      >
        <BackButton to='/space' />
        <h2
          className="landmark-title">
          {landmarkName}
        </h2>
      </div>


      {landmarkName === 'SSAFY 부울경 캠퍼스' &&
        <div className="landmark-card">
          부산·울산·경남 지역 SW 교육 허브<br />
          내 모든 열정을 쏟아 부울경!<br />
          Python, Java<br />
          마지막 자율까지 파이팅!!
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
            <img
              src={moreBtn}
              onClick={handleButtonClick}
            />
          </div>
        </div>
      }
      {landmarkName === 'SSAFY 서울 캠퍼스' &&
        <div className="landmark-card">
          첨단 산업 1번지, SW 1번지<br />
          강남 스타일? 난 SSAFY 스타일!<br />
          python, Java, Embedded<br />
          마지막 자율까지 파이팅!!
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
            <img
              src={moreBtn}
              onClick={handleButtonClick}
            />
          </div>
        </div>
      }
      {landmarkName === 'SSAFY 대전 캠퍼스' &&
        <div className="landmark-card">
          첨단 IT의 메카<br />
          힐링과 사색의 둘레길<br />
          Python, Java<br />
          마지막 자율까지 파이팅!!
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
            <img
              src={moreBtn}
              onClick={handleButtonClick}
            />
          </div>
        </div>
      }
      {landmarkName === 'SSAFY 광주 캠퍼스' &&
        <div className="landmark-card">
          그림같은 남도땅, 예향광주<br />
          광주캠퍼스 식당은 SSAFY 맛집<br />
          Python, Java, Embedded<br />
          마지막 자율까지 파이팅!!
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
            <img
              src={moreBtn}
              onClick={handleButtonClick}
            />
          </div>
        </div>
      }
      {landmarkName === 'SSAFY 구미 캠퍼스' &&
        <div className="landmark-card">
          대한민국의 실리콘밸리<br />
          GALAXY 본 고장<br />
          Python, Java, Mobile<br />
          마지막 자율까지 파이팅!!
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
            <img
              src={moreBtn}
              onClick={handleButtonClick}
            />
          </div>
        </div>
      }



    </>
  );
};

export default LandmarkDetail;