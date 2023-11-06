import React from 'react';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const TraceDetailBack = ({ data, setComment, comment, traceId }) => {
  const longitude = data.longitude
  const latitude = data.latitude
  const commentList = data.comments

  return (
    <div>
      <div>지도 나오는 부분</div>
      <CommentForm setComment={setComment} comment={comment} traceId={traceId} />
      {/* <CommentItem /> */}
      {commentList.map((commentItem, index) => (
        <CommentItem key={index} comment={commentItem} />
      ))}
    </div>
  );
};

export default TraceDetailBack;