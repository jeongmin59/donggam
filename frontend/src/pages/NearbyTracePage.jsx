import React, { useEffect, useState } from "react";
import { getTraceList } from "../api/spaceApi";
import TraceItem from '../components/spacepage/TraceItem';
import BackButton from './../components/common/BackButton';
import { useNavigate } from 'react-router-dom';

const NearbyTracePage = () => {
  const [traceList, setTraceList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getTraceList()
      .then((res) => {
        setTraceList(res.data)
      })
      .catch((err) => {
        // console.log('주변 방명록 목록 가져오기 실패:', err)
      })
  }, [])

  const pageStyle = {
    background: 'radial-gradient(46.06% 46.06% at 50% 53.94%, #D0E3FF 20.21%, #FFF 100%)',
  };

  return (
    <div className="h-screen flex flex-col" style={pageStyle}>
      <BackButton to='/space' type='black' />
      <div className="text-center p-5">
        <h2 className="mt-12">근처에 있는 {traceList.length}개의 <br /> 방명록을 발견했어요!</h2>
      </div>
      <div className="px-5 overflow-auto">
        <div className="mb-10 flex flex-col space-y-4">
          {traceList.map((trace, index) => (
            <TraceItem key={index} title={trace.title} traceId={trace.recordId} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NearbyTracePage;
