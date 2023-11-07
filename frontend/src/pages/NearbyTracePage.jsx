import React, { useEffect, useState } from "react";
import { getTraceList } from "../api/spaceApi";
import TraceItem from '../components/spacepage/TraceItem';
import BackButton from './../components/common/BackButton';

const NearbyTracePage = () => {
  const [traceList, setTraceList] = useState([]);

  // 근처 방명록 조회 axios 호출
  useEffect(() => {
    getTraceList()

      .then((res) => {
        setTraceList(res.data)
      })
      .catch((err) => {
        console.log('주변 방명록 목록 가져오기 실패ㄱ-', err)
      })
  }, [])

  return (
    <>
      <BackButton to='/space' />
      <h1>
        근처에 있는  {traceList.length}개의
        <br />
        방명록을 발견했어요!
      </h1>
      <div className="flex flex-col gap-4">
        {traceList.map((trace, index) => (
          <TraceItem key={index} title={trace.title} traceId={trace.recordId} />
        ))}
      </div>
    </>
  );
};

export default NearbyTracePage;