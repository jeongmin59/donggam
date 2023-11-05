import SmallButton from "../common/SmallButton";
import { sendMail } from "../../api/mailApi";
import addPhotoIcon from "../../assets/icons/addPhoto-icon.svg"
import { useState, useRef } from "react";
import imageCompression from 'browser-image-compression';

const MailModal = ({mailModalInfo, closeMailModal}) => {
  const statusId = mailModalInfo.otherStatusId
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [imageSrc, setImageSrc]= useState(null);

  const imageInputRef = useRef(null);

  const handleSendMailClick = async () => {
    if (!content) {
      console.log("쪽지 내용을 작성하세요");
      return;
    }
    try {
      const res = await sendMail(statusId, content, selectedImage);
      if (res) {
        closeMailModal();
        console.log('쪽지 전송 성공', res.data);
      }
    } catch (err) {
      console.log("쪽지 전송 실패", err);
    }
  }

  // 사진 첨부 
  const handleImageInputChange = (e) => {
    if (e.target.files.length >0) {
      setSelectedImage(e.target.files[0]);
      setIsEditingImage(true);

      // 미리보기
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageSrc(reader.result || null);
      };
    }
  };

  // console.log(statusId, content, selectedImage)

  return(
    <>
      <div className="w-full h-full space-y-3">
        <div className="flex justify-between">
          <h2 className="mx-2">쪽지 보내기</h2>
          <div className="flex item-center">
            <div><img src={addPhotoIcon}/></div>
            {isEditingImage ? (
              <button
                onClick={() => imageInputRef.current.click()}>
                  사진 수정
                </button>
            ) : (
              <label 
                htmlFor="addPhoto">
                  사진 등록
              </label>

            )}
            <input
              className="hidden"
              type="file"
              accept="image/*"
              id="addPhoto"
              ref={imageInputRef}
              onChange={handleImageInputChange}
            />
          </div>
        </div>
        <div className="overflow-y-auto max-h-[300px]">
          {imageSrc && <img src={imageSrc} width="100%" alt="미리보기 이미지" />}
          <textarea
            type="text"
            placeholder="쪽지 내용을 입력하세요"
            className="bg-gray-100 w-full h-60 px-5 mt-2 py-5 ownglyph-text text-left rounded-[16px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={200}
          />
        </div>
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