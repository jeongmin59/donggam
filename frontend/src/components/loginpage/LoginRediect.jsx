import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MemberIdAtom, StatusMessageAtom, NicknameAtom, CharacterIdAtom, AccessTokenAtom, StatusMessageIdAtom, AccessTokenExpirationAtom } from '../../recoil/user/userAtom';
import { useSetRecoilState } from 'recoil';


const LoginRediect = () => {
  const navigator = useNavigate();

  const setAccessToken = useSetRecoilState(AccessTokenAtom);
  const setAccessTokenExpiration = useSetRecoilState(AccessTokenExpirationAtom);
  const setMemberId = useSetRecoilState(MemberIdAtom);
  const setStatusMessage = useSetRecoilState(StatusMessageAtom);
  const setStatusMessageId = useSetRecoilState(StatusMessageIdAtom);
  const setNickname = useSetRecoilState(NicknameAtom);
  const setCharacterId = useSetRecoilState(CharacterIdAtom);


  // REDIRECT_URL의 Params로 온 인가코드 받아오기
  const code = new URL(window.location.href).searchParams.get('code');

  //로그인 요청 후 받아올 수 있는 데이터 목록
  // accessToken, userId, status, cheracterId, nickname

  useEffect(() => {
    axios.get(`https://k9e107.p.ssafy.io/member/login?code=${code}`
    // axios.get(`http://localhost:8080/member/login?code=${code}`
    )
      .then((res) => {
        console.log('성공!!', res.data);

        // res 데이터 받아오기
        const accessToken = res.data.data.accessToken
        const status = res.data.data.status

        //localStorage에 accessToken 저장하기
        window.localStorage.setItem("accessToken", accessToken);


        //userAtom 업데이트
        setAccessToken(accessToken)
        setMemberId(res.data.data.memberId)
        setStatusMessage(res.data.data.status)
        setStatusMessage(status)
        setNickname(res.data.data.nickname)
        setCharacterId(res.data.data.characterId)
        setStatusMessageId(res.data.data.statusId)

        const expirationTime = new Date();
        expirationTime.setHours(expirationTime.getHours() + 24);
        setAccessTokenExpiration(expirationTime); // 수정된 부분


        // 로그인 성공 후 상태 메시지 설정 여부에 따라 네비게이트 해주기
        if (status != null) {
          navigator(`/`) // 메인페이지 이동
        }
        else {
          navigator(`/tutorial`) // 튜토리얼 페이지 이동
        }
      })
      .catch(err => {
        console.log('실패!!!!!!', err);
      });
  }, []);

  return (
    <div>
      로그인 중..
    </div>
  );
};

export default LoginRediect;