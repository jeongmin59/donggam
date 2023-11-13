import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { LocationSelector } from './../../recoil/location/locationSelector';

const MyTraceMap = ({ mappedList }) => {
  const location = useRecoilValue(LocationSelector)
  const nowLongitude = location.longitude
  const nowLatitude = location.latitude

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(nowLatitude, nowLongitude),
      level: 3
    };

    const map = new window.kakao.maps.Map(container, options);

    const positions = mappedList

    const imageSrc =
      'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
    const imageSize = new window.kakao.maps.Size(24, 35);
    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

    for (let i = 0; i < positions.length; i++) {
      const marker = new window.kakao.maps.Marker({
        map: map,
        position: positions[i].latlng,
        title: positions[i].title,
        image: markerImage
      });
    }

  }, []);



  return (
    <div id='map' className='trace-image'>
    </div>
  );
};

export default MyTraceMap;