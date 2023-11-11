import React from 'react';

// 위치 정보 보내는 함수
export const getLocationInfo = (onLocationChange) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        onLocationChange(position);
      },
      (e) => {
        // console.log(e.message);
      }
    );
  } else {
    // console.log('위치 정보를 지원하지 않는 브라우저입니다.');
  }
};