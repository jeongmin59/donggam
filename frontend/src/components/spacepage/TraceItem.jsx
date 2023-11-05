import React from 'react';
import { Link } from 'react-router-dom';

const TraceItem = ({ title, traceId }) => {

  return (
    <Link to={`/space/trace/${traceId}`} >
      <div>
        <h2>{title}</h2>
      </div>
    </Link>
  );
};

export default TraceItem;