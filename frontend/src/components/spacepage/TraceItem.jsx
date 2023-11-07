import React from 'react';
import { Link } from 'react-router-dom';

const TraceItem = ({ title, traceId, index }) => {
  const isOdd = index % 2 === 1;
  
  const itemClasses = `
    h-12 bg-white rounded-3xl shadow-lg inline-flex justify-center items-center
    ${isOdd ? 'ml-auto' : 'mr-auto'}  `;

  return (
    <div className={itemClasses}>
      <Link to={`/space/trace/${traceId}`}>
        <h4 className="px-10 text-center text-blue-400">{title}</h4>
      </Link>
    </div>
  );
};

export default TraceItem;
