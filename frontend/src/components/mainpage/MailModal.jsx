import SmallButton from "../common/SmallButton";
import { sendMail } from "../../api/mailApi";
import addPhotoIcon from "../../assets/icons/addPhoto-icon.svg"
import { useState } from "react";

const MailModal = ({mailModalInfo, openMailModal}) => {
  // const [buttonText, setButtonText] = useState("사진첨부");

  // // 사진 첨부
  // const handleFileSelect = () => {
  //   const fileInput = document.getElementById("fileInput");
  //   if (fileInput) {
  //     fileInput.click();
  //     setButtonText('사진수정')
  //   }
  // }
  const statusId = mailModalInfo.otherStatusId
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSendMailClick = async () => {
    if (!content) {
      console.log("쪽지 내용을 작성하세요");
      return;
    }
    try {
      const res = await sendMail(statusId, content, selectedImage);
      if (res) {
        console.log('쪽지 전송 성공', res.data);
      }
    } catch (err) {
      console.log("쪽지 전송 실패", err);
    }
  }

  console.log(statusId, content, selectedImage)

  return(
    <>
      <div className="w-[100%] h-[100%] space-y-3">
        <div className="flex justify-between">
          <h2 className="mx-2">{mailModalInfo.otherStatusId}쪽지 쓰기</h2>
          <div className="flex item-center">
            <div><img src={addPhotoIcon}/></div>
            <p>사진첨부</p>
          </div>
        </div>
        <textarea
          type="text"
          placeholder="쪽지 내용을 입력하세요"
          className="bg-gray-100 w-[100%] h-60 px-5 py-5 text-left rounded-[16px]"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="mt-5 flex ">
        <SmallButton 
          title='쪽지쓰기' 
          onClick={handleSendMailClick} // (예정)
        />
      </div>
    </>
  );
};

export default MailModal;