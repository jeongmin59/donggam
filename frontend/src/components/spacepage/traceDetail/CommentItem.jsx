import React from 'react';
import DateTimeFormatter from '../../../utils/date';

const CommentItem = (commentItem) => {
  const content = commentItem.comment.content
  const date = commentItem.comment.createdAt


  return (
    <div className='' >
      <h3>{content}</h3>

      <p>작성 시간: <DateTimeFormatter dateTimeString={date} /></p>
    </div>
  );
};

export default CommentItem;