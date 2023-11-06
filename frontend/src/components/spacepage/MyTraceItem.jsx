import React from 'react';

const MyTraceItem = (traceData) => {
  const title = traceData.data.title
  const date = traceData.data.createdAt

  return (
    <div>
      <h3>{title}</h3>
      <p>{date}</p>
    </div>
  );
};

export default MyTraceItem;