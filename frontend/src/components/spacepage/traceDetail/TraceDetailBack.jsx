import React, { useEffect, useState } from 'react';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import TraceDetailTitle from './TraceDetailTitle';
import { getKakaoAddress } from '../../../api/mapApi';
import TraceDetailMap from './TraceDetailMap';

const TraceDetailBack = ({ data, setComment, comment, traceId, setShowFront }) => {
  const [location, setLocation] = useState('');

  const title = data.title
  const longitude = data.longitude
  const latitude = data.latitude
  const commentList = data.comments
  const commentCount = commentList.length

  const updateLocation = async () => {
    const res = await getKakaoAddress(latitude, longitude);
    // console.log(res)
    setLocation(res);
  }

  useEffect(() => {
    updateLocation();
  }, []);

  return (
    <div >
      <TraceDetailMap latitude={latitude} longitude={longitude} />

      <TraceDetailTitle title={title} content={location} />

      <div className='trace-comment-bg flex'>
        <div className='w-full mt-12 px-8'>
          <div>
            <h2 className='text-md'>{commentCount}개의 댓글</h2>
            <div className='overflow-y-scroll' style={{ height: '35vh' }}>
              <li className='trace-comment-item flex-col justify-start items-end mt-2 mb-4 gap-2 inline-flex' style={{ overflowY: 'scroll' }}>
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