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
      <img src='https://item.kakaocdn.net/do/7277796c3f7ef108040dcfde1bd2fb9c960f4ab09fe6e38bae8c63030c9b37f9' className="trace-image text-justify" />

      <TraceDetailTitle title={title} content={location} />

      <div className='trace-comment '>
        <div>
          {commentList.map((commentItem, index) => (
            <CommentItem key={index} comment={commentItem} />
          ))}
        </div>

        <div className='flex justify-center'>
          <CommentForm setComment={setComment} comment={comment} traceId={traceId} setShowFront={setShowFront} />
        </div>
      </div>


    </div >
  );
};

export default TraceDetailBack;