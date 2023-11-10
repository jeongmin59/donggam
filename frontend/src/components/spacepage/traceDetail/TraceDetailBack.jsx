import React from 'react';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import TraceDetailTitle from './TraceDetailTitle';
// import defaultimg from '../../../assets/icons/android-chrome-192x192.png'

const TraceDetailBack = ({ data, setComment, comment, traceId, setShowFront }) => {
  const title = data.title
  const longitude = data.longitude
  const latitude = data.latitude
  const commentList = data.comments
  // const location = `위도: ${longitude} 경도:${latitude}`;
  const commentCount = commentList.length

  return (
    <div >
      {/* <img src='/icons/android-chrome-192x192.png' alt='지도 사진' className="trace-image text-justify" /> */}
      <div src='/icons/android-chrome-192x192.png' alt='지도 사진' className="trace-image text-justify bg-slate-50"></div>

      <TraceDetailTitle title={title} content="위치 서비스는 추후 업데이트" />

      <div className='trace-comment-bg flex'>
        <div className='w-full mt-12 px-8'>
          <div>
            <h2 className='text-md'>{commentCount}개의 댓글</h2>
            <div className='overflow-y-scroll' style={{ height: '35vh' }}>
              <li className='trace-comment-item flex-col justify-start items-end mb-4 gap-2 inline-flex' style={{ overflowY: 'scroll' }}>
                {commentList.map((commentItem, index) => (
                  <CommentItem key={index} comment={commentItem} />
                ))}
              </li>
            </div>
          </div>


          <div className=''>
            <CommentForm setComment={setComment} comment={comment} traceId={traceId} setShowFront={setShowFront} />
          </div>
        </div>
      </div>
    </div >
  );
};

export default TraceDetailBack;