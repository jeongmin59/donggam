// 위도, 경도 정보로 카카오 주소 가져오기
export const getKakaoAddress = async (latitude, longitude) => {
  const URI = `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`;
  const headers = {
    Authorization: 'KakaoAK 48fe0d040eac475f7b407702d4e3d9ca',
  };

  try {
    const response = await fetch(URI, { headers });
    const data = await response.json();
    const fullAddress = data.documents[0].address_name;
    // console.log('지도!해낸다.', fullAddress)
    return fullAddress;
  } catch (err) {
    console.error('카카오 API 호출 오류:', err);
  }
};