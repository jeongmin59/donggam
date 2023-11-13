import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { LocationSelector } from './../../recoil/location/locationSelector';
import markerImg from '../../assets/icons/marker.svg'

const MyTraceMap = ({ mappedList }) => {
  const location = useRecoilValue(LocationSelector)
  const nowLongitude = location.longitude
  const nowLatitude = location.latitude

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(nowLatitude, nowLongitude),
      level: 10,
    };

    const map = new window.kakao.maps.Map(container, options);

    const positions = mappedList

    const imageSize = new window.kakao.maps.Size(60, 60);
    const markerImage = new window.kakao.maps.MarkerImage(markerImg, imageSize);

    // 마커 배열 초기화
    const markers = [];

    for (let i = 0; i < positions.length; i++) {
      const marker = new window.kakao.maps.Marker({
        map: map,
        position: positions[i].latlng,
        title: positions[i].title,
        image: markerImage,
      });

      markers.push(marker);

      //   커스텀 오버레이를 생성합니다.
      const title = positions[i].title;
      const traceId = positions[i].traceId;

      const content = '<div class="overlay-box">' +
        `  <a href="https://donggam.site/space/trace/${traceId}" 
      class="overlay-link">` +
        `    <h5 class="text-white">${title}</h5>` +
        '  </a>' +
        '</div>';

      const customOverlay = new window.kakao.maps.CustomOverlay({
        content: content,
        position: positions[i].latlng,
        yAnchor: 2.5,
      });

      customOverlay.setMap(map);
    }

    // 클러스터러 초기화
    const clusterer = new window.kakao.maps.MarkerClusterer({
      map: map,
      averageCenter: true,
      minLevel: 5,
      markers: markers,
    });

  }, []);


  return (
    <div className=' flex justify-center px-4 pt-2'>
      <div id='map' className='trace-map' >
      </div>
    </div>
  );
};

export default MyTraceMap;