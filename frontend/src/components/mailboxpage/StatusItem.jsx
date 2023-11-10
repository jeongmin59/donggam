import React from 'react';

const StatusItem = ({ status, changeStatus }) => {
  const statusItem = status;

  const handleStatusChange = () => {
    // 클릭 시 changeStatus 함수 실행
    changeStatus({
      selectedStatus: statusItem.status,
      selectedStatusId: statusItem.id,
    });
  };

  return (

    <div 
      onClick={handleStatusChange} 
      className="w-full h-fit px-5 py-3 mb-3 bg-slate-100 rounded-xl flex justify-start items-center">
      
      <h4 className="text-black text-md">{statusItem.status}</h4>
    </div>
  );
};

export default StatusItem;
