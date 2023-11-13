import React, { useEffect, useState, useRef } from "react";
import { getTraceList } from "../api/spaceApi";
import TraceItem from "../components/spacepage/TraceItem";
import BackButton from "./../components/common/BackButton";
import { useNavigate } from "react-router-dom";

const NearbyTracePage = () => {
  const [traceList, setTraceList] = useState([]);
  const [displayData, setDisplayData] = useState([]); // 현재 화면에 보여줄 데이터
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지

  const itemsPerPage = 12;
  const containerRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    getTraceList()
      .then((res) => {
        setTraceList(res.data);
      })
      .catch((err) => {
        // console.log('주변 방명록 목록 가져오기 실패:', err)
      });
  }, []);
  // 스크롤 이벤트 핸들러
  const checkScroll = () => {
    if (!traceList.length) return; // traceList가 비어있으면 종료
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 5;
    if (isNearBottom) {
      console.log("스크롤이 끝에 도달했습니다!");
      setCurrentPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setDisplayData(traceList.slice(0, itemsPerPage * (currentPage + 1)));
  }, [traceList, currentPage]);

  useEffect(() => {
    //스크롤 이벤트 등록
    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", checkScroll);
    }
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", checkScroll);
      }
    };
  }, [checkScroll]);

  const pageStyle = {
    background:
      "radial-gradient(46.06% 46.06% at 50% 53.94%, #D0E3FF 20.21%, #FFF 100%)",
  };

  return (
    <div className="flex h-screen flex-col" style={pageStyle}>
      <BackButton to="/space" type="black" />
      <div className="p-5 text-center">
        <h2 className="mt-12">
          근처에 있는 {traceList.length}개의 <br /> 방명록을 발견했어요!
        </h2>
      </div>
      <div ref={containerRef} className="overflow-auto px-5">
        <div className="mb-10 flex flex-col space-y-4">
          {displayData.map((trace, index) => (
            <TraceItem
              key={index}
              title={trace.title}
              traceId={trace.recordId}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NearbyTracePage;
