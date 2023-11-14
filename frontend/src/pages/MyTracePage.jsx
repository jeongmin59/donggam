import React, { useEffect, useState } from "react";
import MyTraceItem from '../components/spacepage/MyTraceItem';
import { getMyTrace } from "../api/spaceApi";
import Header from '../components/common/Header';
import CreateButton from '../components/common/CreateButton';
import MyTraceMap from "../components/spacepage/MyTraceMap";

const MyTracePage = () => {
  // 탭 상태 설정 (default는 리스트로 보기)
  const [isListTabSelected, setListTabSelected] = useState(true);

  const [traceList, setTraceList] = useState([]);

  const mappedList = traceList.map(item => ({
    title: item.title,
    latlng: new window.kakao.maps.LatLng(item.latitude, item.longitude),
    traceId: item.recordId
  }));

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

        {/* 탭 버튼 */}
        <div className="flex justify-around">
          <button
            onClick={() => setListTabSelected(true)}
            className={`${isListTabSelected ? 'isSelected-tab ' : 'isNotSelected-tab'}`}
          >
            <sub-title>리스트로 보기</sub-title>
          </button>
          <button
            onClick={() => setListTabSelected(false)}
            className={`${!isListTabSelected ? 'isSelected-tab' : 'isNotSelected-tab'}`}
          >
            <sub-title>지도로 보기</sub-title>
          </button>
        </div>


        <div className='px-4 pt-2 bg-white overflow-y-auto h-full max-h-[calc(100vh-120px)]'>
          <div className="">
            <ul>
              {isListTabSelected && (
                traceList.map((traceData, index) => (
                  <MyTraceItem key={index} data={traceData} />
                )))
              }
            </ul>
          </div>
          {!isListTabSelected && <MyTraceMap mappedList={mappedList} />}
        </div>
      </div >
      <CreateButton to='/space/upload' />
    </>
  );
};

export default MyTracePage;
