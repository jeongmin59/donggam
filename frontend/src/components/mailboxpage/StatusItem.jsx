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
    <div onClick={handleStatusChange} className="cursor-pointer">
      <p>상메 : {statusItem.status}</p>
    </div>
  );
};

export default StatusItem;
