import React from 'react';
import Header from '../components/common/Header';

const TutorialPage = () => {
  return (
    <div>
      <Header title="튜토리얼 페이지" />
      <div>
        <a href="/profile" className="bg-blue-500 hover:bg-blue-300 text-white font-semibold px-4 py-2 flex-auto">
          Skip 하고 프로필 설정하기
        </a>
      </div>
    </div>
  );
};

export default TutorialPage;