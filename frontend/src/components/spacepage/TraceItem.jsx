import React from 'react';
import { Link } from 'react-router-dom';

const TraceItem = ({ title, traceId }) => {

  return (
    <Link to={`/space/trace/${traceId}`} >
      <div className="w-auto max-w-full h-12 px-2 bg-white rounded-3xl shadow justify-center items-center gap-2.5 inline-flex">
        <div className="text-center text-blue-200 text-base font-medium font-['Gmarket Sans TTF']">{title}.</div>
      </div>
    </Link>
  );
};

export default TraceItem;