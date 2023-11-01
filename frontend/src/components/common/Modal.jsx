import React from "react";


const Modal = ({isOpen, onClose, children}) => {
  // console.log(children)

  // 모달 밖 클릭 시 모달 닫힘 
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return(
    <>
      {/* 모달 컨테이너 */}
      <div 
        className={`${isOpen ? 'show' : ''} 
        top-0 left-0 w-full h-full fixed flex justify-center align-center`}
        style = {{ 
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          padding: '0 28px 0',
          zIndex:3,
        }}
        onClick={handleBackgroundClick}  
      >
        {/* 모달 컨텐츠 */}
        <div
          style = {{
            backgroundColor: 'white',
            borderRadius: '20px',
            width:'100%',
            height:'55%',
            margin: 'auto'
          }}>
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;