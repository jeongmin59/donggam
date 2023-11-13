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
      level: 10
    };

    const map = new window.kakao.maps.Map(container, options);

    const positions = mappedList

    const imageSize = new window.kakao.maps.Size(60, 60);
    const markerImage = new window.kakao.maps.MarkerImage(markerImg, imageSize);

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
    <div className=' flex justify-center px-4 pt-2'>
      <div id='map' className='trace-map' >
      </div>
    </div>
  );
};

export default MyTraceMap;