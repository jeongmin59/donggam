import React from 'react';
import { useParams } from 'react-router-dom';

const TraceDetailPage = () => {
  const traceId = useParams();
  console.log('아이디이이', traceId)


  return (
    <div>
      방명록 상세 조회 페이지
    </div>
  );
};

export default TraceDetailPage;