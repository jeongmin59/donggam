import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MemberIdAtom } from '../../recoil/user/userAtom';
import { useRecoilState } from 'recoil';


const LoginRediect = () => {
  const navigator = useNavigate();

  const [memberId, setMemberId] = useRecoilState(MemberIdAtom)

  // REDIRECT_URL의 Params로 온 인가코드 받아오기
  const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    axios.get(`http://k9e107.p.ssafy.io/member/login?code=${code}`
    )
      .then((res) => {
        console.log('성공!!', res.data);
        window.localStorage.setItem("accessToken", res.data.data.accessToken); //localStorage에 accessToken 저장하기

        //userAtom 업데이트
        setMemberId(res.data.data.memberId)
        console.log(res.data.data.memberId)

        navigator('/') // 로그인 성공 후 메인페이지로 이동
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