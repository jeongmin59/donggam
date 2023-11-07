import React from 'react';

const TraceDetailTitle = ({ title, content }) => {
  console.log(content)

  return (
    <div
      className="trace-title text-center" >
      {title}
      <br />
      {content}
    </div >
  );
};

export default TraceDetailTitle;