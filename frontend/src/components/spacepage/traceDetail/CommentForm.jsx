import React from 'react';
import { postTraceComment } from '../../../api/spaceApi';

const CommentForm = ({ setComment, comment, traceId }) => {

  // 댓글 입력이 변경될 때 호출되는 함수
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  // 댓글을 제출할 때 호출되는 함수
  const handleSubmitComment = (e) => {
    postTraceComment(traceId, comment)

    e.preventDefault(); // 폼 제출 시 페이지 리로드 방지

    // 댓글을 처리하고 상태 초기화 또는 전송할 수 있음
    console.log('제출된 댓글:', comment);
    setComment(''); // 댓글 입력창 비우기
  };

  return (
    <div>
      <form onSubmit={handleSubmitComment}>
        <textarea
          rows="4"
          cols="50"
          placeholder="댓글을 입력하세요"
          value={comment}
          onChange={handleCommentChange}
        />
        <br />
        <button type="submit">댓글 작성</button>
      </form>
    </div>
  );
};

export default CommentForm;
