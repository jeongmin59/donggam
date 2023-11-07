import React from 'react';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import TraceDetailTitle from './TraceDetailTitle';

const TraceDetailBack = ({ data, setComment, comment, traceId, setShowFront }) => {
  const title = data.title
  const longitude = data.longitude
  const latitude = data.latitude
  const commentList = data.comments
  // const location = `위도: ${longitude} 경도:${latitude}`;
  const commentCount = commentList.length

  return (
    <div>
      <img src='https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/321/d4c6b40843af7f4f1d8000cafef4a2e7_res.jpeg' className="trace-image text-justify" />

      <TraceDetailTitle title={title} content="위치 서비스는 추후 업데이트" />

      <div className='trace-comment-bg'>
        <div>
          <h2>{commentCount}개의 댓글</h2>
          <li className='trace-comment-item overflow-y-scroll'>
            {commentList.map((commentItem, index) => (
              <CommentItem key={index} comment={commentItem} />
            ))}
          </li>

          <CommentForm setComment={setComment} comment={comment} traceId={traceId} setShowFront={setShowFront} />
        </div>
      </div>
    </div >
  );
};

export default TraceDetailBack;