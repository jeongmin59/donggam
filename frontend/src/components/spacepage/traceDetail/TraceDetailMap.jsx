import React, { useEffect } from 'react';
import markerImg from '../../../assets/icons/marker.svg'

const TraceDetailMap = ({ longitude, latitude }) => {

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

  }, []);

  return (
    <div>
      < div id="map" className='trace-image z-0' ></ div>
    </div >
  );
};

export default TraceDetailMap;