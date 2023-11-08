import React from 'react';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import TraceDetailTitle from './TraceDetailTitle';

const TraceDetailBack = ({ data, setComment, comment, traceId }) => {
  const title = data.title
  const longitude = data.longitude
  const latitude = data.latitude
  const commentList = data.comments
  // const location = `위도: ${longitude} 경도:${latitude}`;
  const commentCount = commentList.length

  return (
    <div >
      <img src='' alt='지도 사진' className="trace-image text-justify" />

      <TraceDetailTitle title={title} content="위치 서비스는 추후 업데이트" />

      <div className='trace-comment-bg flex'>
        <div className='w-full mt-12 px-5'>

          <div className=''>
            <h2 className='text-md'>{commentCount}개의 댓글</h2>


            <div className='overflow-y-scroll' style={{ height: '35vh' }}>
              <li className='trace-comment-item ' style={{ overflowY: 'scroll' }}>
                {commentList.map((commentItem, index) => (
                  <CommentItem key={index} comment={commentItem} />
                ))}
              </li>
            </div>
          </div>


          <div>
            <CommentForm setComment={setComment} comment={comment} traceId={traceId} />
          </div>
        </div>
      </div>
    </div >
  );
};

export default TraceDetailBack;