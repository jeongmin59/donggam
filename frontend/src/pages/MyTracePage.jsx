import React, { useEffect, useState } from "react";
import MyTraceItem from './../components/spacepage/MyTraceItem';
import { getMyTrace } from "../api/spaceApi";
import Header from './../components/common/Header';
import CreateButton from './../components/common/CreateButton';

const MyTracePage = () => {
  const [traceList, setTraceList] = useState([])


  // 내 방명록 조회 axios 호출
  const updateTraceList = async () => {
    const res = await getMyTrace();
    setTraceList(res.data);
  }

  useEffect(() => {
    updateTraceList()
  }, [])

  return (
    <>
      <div className="bg-white h-screen">
        <Header title="내 방명록" to='/space' />
        <div className='px-5 pt-5 overflow-y-auto h-full max-h-[calc(100vh-100px)]'>
          <div>
            <ul>
              {traceList.map((traceData, index) => (
                <MyTraceItem key={index} data={traceData} />
              ))}
            </ul>
          </div>
        </div>
      </div>
      <CreateButton to='/space/upload' />
    </>
  );
};

export default MyTracePage;