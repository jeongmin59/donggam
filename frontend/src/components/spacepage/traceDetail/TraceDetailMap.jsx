import React, { useEffect } from 'react';

const TraceDetailMap = ({ longitude, latitude }) => {

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(latitude, longitude),
      level: 3
    };

    const map = new window.kakao.maps.Map(container, options);


    const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);

    const marker = new window.kakao.maps.Marker({
      position: markerPosition
    });

    marker.setMap(map);

  }, []);


  return (
    <div>
      <div id="map" className='trace-image z-0'></div>
    </div>
  );
};

export default TraceDetailMap;