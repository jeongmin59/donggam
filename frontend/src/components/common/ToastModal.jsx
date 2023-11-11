import React from "react";

const ToastModal = ({ message, onClose }) => {

  const handleConfirmClick = () => {
    onClose(false);
  }

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
      <div className="text-sm font-normal">{message}</div>
      <div className="mt-2 flex justify-end">
        <button onClick={handleConfirmClick}
          className="text-sm font-medium text-blue-600 p-1.5 hover:bg-blue-100 rounded-lg dark:text-blue-500 dark:hover:bg-gray-700"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default ToastModal;
