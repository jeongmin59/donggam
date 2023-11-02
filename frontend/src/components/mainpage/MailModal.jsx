import SmallButton from "../common/SmallButton";

const MailModal = ({mailModalInfo, openMailModal}) => {
  return(
    <>
      <div className="w-[100%] h-[100%] space-y-3">
        <h2 className="mx-2">{mailModalInfo.otherStatusId}쪽지 쓰기</h2>
        <textarea
          type="text"
          placeholder="쪽지 내용을 입력하세요"
          // onChange={}
          className="bg-gray-100 w-[100%] h-60 px-5 py-5 text-left"
        />
      </div>
      <div className="mt-5 flex ">
        <SmallButton 
          title='쪽지쓰기' 
          onClick={() => openMailModal(modalInfo.otherStatusId)} // (예정)
        />
      </div>
    </>
  );
};

export default MailModal;