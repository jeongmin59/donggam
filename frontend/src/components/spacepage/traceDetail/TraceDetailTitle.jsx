import React from 'react';

const TraceDetailTitle = ({ title, content }) => {
  console.log(content)

  return (
    <div
      className="w-72 h-14 px-16 py-2 bg-white rounded-2xl border-2 border-blue-200  justify-center items-center gap-0.5 inline-flex">
      <div
        className="text-center text-zinc-800 text-lg font-medium font-['Gmarket Sans TTF']">
        {title}
      </div>

      <div
        className="text-center text-zinc-500 text-xs font-medium font-['Gmarket Sans TTF']">
        {content}
      </div>
    </div>
  );
};

export default TraceDetailTitle;