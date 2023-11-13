import React, { useEffect } from 'react';
import markerImg from '../../../assets/icons/marker.svg'

const TraceDetailMap = ({ title, longitude, latitude }) => {

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(latitude, longitude),
      level: 4
    };

    const map = new window.kakao.maps.Map(container, options);

    const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);

    const imageSize = new window.kakao.maps.Size(60, 60);
    const markerImage = new window.kakao.maps.MarkerImage(markerImg, imageSize);

    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
      image: markerImage
    });

    marker.setMap(map);

    const content = '<div class="overlay-box">' +
      `  <a href="https://map.kakao.com/link/map/${latitude}, ${longitude}" class="overlay-link" target="_blank">` +
      `    <h5 class="text-white">카카오 맵으로 보기</h5>` +
      '  </a>' +
      '</div>';

    const customOverlay = new window.kakao.maps.CustomOverlay({
      content: content,
      position: markerPosition,
      yAnchor: 2.5
    });

    // 커스텀 오버레이를 지도에 추가합니다.
    customOverlay.setMap(map);

  }, []);

  return (
    <div>
      < div id="map" className='trace-image z-0' ></ div>
    </div >
  );
};

export default TraceDetailMap;