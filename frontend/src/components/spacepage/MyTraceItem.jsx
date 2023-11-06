import React from 'react';
import { Link } from 'react-router-dom';

const MyTraceItem = (traceData) => {
  const traceId = traceData.data.recordId
  const title = traceData.data.title
  const date = traceData.data.createdAt

  return (
    <Link to={`/space/trace/${traceId}`} >
      <div>
        <h3>{title}</h3>
        <p>{date}</p>
      </div>
    </Link>
  );
};

export default MyTraceItem;