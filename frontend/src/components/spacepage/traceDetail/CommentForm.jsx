import React, { useEffect } from 'react';
import { postTraceComment } from '../../../api/spaceApi';

const CommentForm = ({ setComment, comment, traceId }) => {

  // 댓글 입력이 변경될 때 호출되는 함수
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const errorCallback = () => {
    console.log("401에러 발생");
    const confirm = window.confirm('다시 로그인 해주세요.');
    if (confirm) {
      navigate('/login');
    }
  }

  // 댓글을 제출할 때 호출되는 함수
  const handleSubmitComment = (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 리로드 방지

    postTraceComment(traceId, comment, errorCallback)

    // 댓글을 처리하고 상태 초기화 또는 전송할 수 있음
    console.log('제출된 댓글:', comment);
    setComment(''); // 댓글 입력창 비우기
    window.location.reload();
  };

  return (
    <>
      <div className='pr-5 fixed bottom-16 flex gap-1'>
        <textarea
          rows="1"
          cols="50"
          placeholder="댓글을 입력하세요"
          value={comment}
          onChange={handleCommentChange}
          className="border-2 border-blue-300 w-[100%] rounded-lg p-4  "
        />
        <button onClick={handleSubmitComment} className='w-1/4 bg-blue-300 text-white text-sm rounded-xl px-2'>등록</button>
      </div>
    </>
  );
};

export default CommentForm;
