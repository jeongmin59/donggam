import React, { useEffect, useState } from "react";
import BackButton from './../components/common/BackButton';
import MyTraceItem from './../components/spacepage/MyTraceItem';
import { getMyTrace } from "../api/spaceApi";

const MyTracePage = () => {
  const [traceList, setTraceList] = useState([])

  // 내 방명록 조회 axios 호출
  useEffect(() => {
    getMyTrace()
      .then((res) => {
        setTraceList(res.data)
        // console.log('내 방명록 잘 옴??', res.data)
      })
      .catch((err) => {
        console.log('내 방명록 가져오기  실패ㄱ-', err)
      })
  }, [])

  // if (!traceList) {
  //   return null;
  // }

  return (
    <>
      <div>
        <BackButton to='/space' />
      </div>
      <div>
        <h3>근처에 있는 {traceList.length}개
          방명록을 발견했어요!</h3>
      </div>
      <div>
        {traceList.map((traceData, index) => (
          <MyTraceItem key={index} data={traceData} />
        ))}
      </div>
    </>
  );
};

export default MyTracePage;