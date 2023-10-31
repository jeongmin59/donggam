import React from "react";

const Modal = ({isOpen, onclose, children}) => {
  console.log(children)

  // 모달 밖 클릭 시 모달 닫힘 
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onclose();
    }
  };

  if (!isOpen) return null;

  return(
    <>
      {/* 모달 컨테이너 */}
      <div 
        className={`${isOpen ? 'show' : ''}`}
        onClick={handleBackgroundClick}  
      >
        {/* 모달 컨텐츠 */}
        <div>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;