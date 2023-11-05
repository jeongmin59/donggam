import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTraceDetail } from '../api/spaceApi';
import Header from '../components/common/Header';
import TraceDetailFront from '../components/spacepage/traceDetail/TraceDetailFront';
import TraceDetailBack from '../components/spacepage/traceDetail/TraceDetailBack';

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
      <Header title='방명록 상세 페이지' to='/space/trace' />


      {/* showFront 상태에 따라서 TraceDetailFront 또는 TraceDetailBack 컴포넌트를 렌더링합니다 */}
      {showFront ? <TraceDetailFront data={traceData} /> : <TraceDetailBack data={traceData} comment={comment} setComment={setComment} traceId={traceId} />}

      <button onClick={toggleComponent}>뒤집기</button>
    </div>
  );
};

export default TraceDetailPage;