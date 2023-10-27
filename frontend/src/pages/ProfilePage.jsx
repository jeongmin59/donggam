import React from 'react';

const ProfilePage = () => {
  return (
    <div>
      {/* 헤더 */}
      <div className="w-[360px] h-[100px] left-0 top-0 absolute rounded-[20px] shadow">
        <div className="w-[360px] h-[100px] left-0 top-0 absolute bg-white rounded-tl-[20px] rounded-tr-[20px]" />
        <div className="w-[360px] left-0 top-[56.22px] absolute justify-center items-center gap-28 inline-flex">
          <div className="text-center text-black text-xl font-bold">내 프로필 만들기</div>
          <div className="left-[304px] top-[59px] flex text-right">완료</div>
        </div>
      </div>

      {/* 닉네임 변경 */}
      <div className="left-[60px] top-[203px] absolute text-center">익명의 감자</div>
      <div className="w-[247px] h-[0px] left-[57px] top-[229px] absolute border border-black"></div>
      <div className="left-[268px] top-[236px] absolute text-center text-black text-sm font-light font-['Gmarket Sans TTF']">6/20</div>

      {/* 캐릭터 변경 */}
      <div className="left-[138px] top-[476px] absolute text-center">캐릭터 변경하기</div>
      <img className="w-[120px] h-[168.30px] left-[120px] top-[307px] absolute" src="https://via.placeholder.com/120x168" />
      <div className="w-8 h-8 left-[208px] top-[443px] absolute">
        <div className="w-8 h-8 left-0 top-0 absolute bg-zinc-300 rounded-full" />
      </div>

      {/* 상태메시지 변경 */}
      <div className="left-[57px] top-[560px] absolute text-center">상태메시지</div>
      <div className="left-[57px] top-[593px] absolute text-center">마음껏 자신을 소개해보세요!</div>
      <div className="left-[60px] top-[624px] absolute text-center">*최소 2글자 이상 작성해주세요</div>
      <div className="w-[247px] h-[0px] left-[57px] top-[617px] absolute border border-black"></div>
      <div className="left-[268px] top-[624px] absolute text-center text-black text-sm font-light">0/60</div>
    </div>
  );
};

export default ProfilePage;