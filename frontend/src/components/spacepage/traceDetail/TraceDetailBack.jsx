import React from 'react';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import TraceDetailTitle from './TraceDetailTitle';

const TraceDetailBack = ({ data, setComment, comment, traceId, setShowFront }) => {
  const title = data.title
  const longitude = data.longitude
  const latitude = data.latitude
  const commentList = data.comments
  const location = `위도: ${longitude} 경도:${latitude}`;

  return (
    <div>
      <div className="w-96 h-72">지도 나오는 부분</div>
      <TraceDetailTitle title={title} content={location} />
      <div>
        {commentList.map((commentItem, index) => (
          <CommentItem key={index} comment={commentItem} />
        ))}
      </div>
      <div>
        <CommentForm setComment={setComment} comment={comment} traceId={traceId} setShowFront={setShowFront} />
      </div>
    </div>
  );
};

export default TraceDetailBack;