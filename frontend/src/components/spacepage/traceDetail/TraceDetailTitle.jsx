import React from 'react';

const TraceDetailTitle = ({ title, content }) => {

  return (
    <div
      className="trace-title text-center content-center" >
      <h3>{title}</h3>
      <h5>{content}</h5>
    </div >
  );
};

export default TraceDetailTitle;