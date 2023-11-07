import React from 'react';
import DateTimeFormatter from '../../../utils/date';

const TraceDetailTitle = ({ title, content }) => {
  console.log(content)

  return (
    <div
      className="trace-title text-center content-center" >
      <h3>{title}</h3>
      <h5>{content}</h5>
    </div >
  );
};

export default TraceDetailTitle;