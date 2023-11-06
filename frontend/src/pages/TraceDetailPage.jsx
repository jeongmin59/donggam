import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTraceDetail } from '../api/spaceApi';
import TraceDetailFront from '../components/spacepage/traceDetail/TraceDetailFront';
import TraceDetailBack from '../components/spacepage/traceDetail/TraceDetailBack';
import BackButton from './../components/common/BackButton';

const TraceDetailPage = () => {
  const { traceId } = useParams(); // object로 온다.
  const [traceData, setTraceData] = useState(null);
  const [comment, setComment] = useState('');


  // 방명록 상세 조회 axios 호출
  useEffect(() => {
    const traceIdInt = parseInt(traceId, 10); // int로 변환

    getTraceDetail(traceIdInt)

      .then((res) => {
        setTraceData(res.data)
        // console.log('데이터 어케옴', res.data)
      })
      .catch((err) => {
        console.log('방명록 상세보기  실패ㄱ-', err)
      })
  }, [])

  // 버튼을 통해 앞, 뒤 컴포넌트 전환
  const [showFront, setShowFront] = useState(true);

  const toggleComponent = () => {
    setShowFront(!showFront);
  };

  // traceData가 null일 때 데이터 넘겨주지 않도록
  if (!traceData) {
    return null;
  }



  return (
    <div>
      <BackButton to={-1} />


      {/* showFront 상태에 따라서 TraceDetailFront 또는 TraceDetailBack 컴포넌트를 렌더링합니다 */}
      {showFront ? <TraceDetailFront data={traceData} /> : <TraceDetailBack data={traceData} comment={comment} setComment={setComment} traceId={traceId} setShowFront={setShowFront} />}

      <button className="w-36 h-14 px-3 py-2 bg-blue-200 rounded-3xl border-2 justify-center items-center gap-3 inline-flex fixed bottom-0 left-1/2 transform -translate-x-1/2" onClick={toggleComponent}>
        눌러보세요
      </button>

    </div>
  );
};

export default TraceDetailPage;