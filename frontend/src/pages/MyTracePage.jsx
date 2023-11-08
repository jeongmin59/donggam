import React, { useEffect, useState } from "react";
import MyTraceItem from './../components/spacepage/MyTraceItem';
import { getMyTrace } from "../api/spaceApi";
import Header from './../components/common/Header';
import { useNavigate } from 'react-router-dom';

const MyTracePage = () => {
  const [traceList, setTraceList] = useState([])

  const navigate = useNavigate();

  const errorCallback = () => {
    console.log("401에러 발생");
    const confirm = window.confirm('다시 로그인 해주세요.');
    if (confirm) {
      navigate('/login');
    }
  }

  // 내 방명록 조회 axios 호출
  useEffect(() => {
    getMyTrace(errorCallback)
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
      <Header title="내 방명록" to='/space' />
      <div className='px-5'>
        <ul>
          {traceList.map((traceData, index) => (
            <MyTraceItem key={index} data={traceData} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default MyTracePage;