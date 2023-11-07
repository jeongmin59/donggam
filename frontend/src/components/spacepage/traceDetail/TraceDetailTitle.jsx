import React from 'react';

const TraceDetailTitle = ({ title, content }) => {
  console.log(content)

  return (
    <div
      className="trace-title z-50">
      {title}
      <br />
      {content}
    </div >
  );
};

export default TraceDetailTitle;