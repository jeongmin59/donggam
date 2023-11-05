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
      className="bg-slate-100 hover:bg-slate-300 p-2 m-2 cursor-pointer overflow-y-auto max-h-36">
      
      <h4>{statusItem.status}</h4>
    </div>
  );
};

export default StatusItem;
