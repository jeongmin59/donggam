import SmallButton from "../common/SmallButton";
import { sendMail } from "../../api/mailApi";
import addPhotoIcon from "../../assets/icons/addPhoto-icon.svg"
import { useState, useRef } from "react";
import imageCompression from 'browser-image-compression';
import { useNavigate } from 'react-router-dom';

const MailModal = ({mailModalInfo, closeMailModal}) => {
  const statusId = mailModalInfo.otherStatusId
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [imageSrc, setImageSrc]= useState(null);

  const imageInputRef = useRef(null);

  const navigate = useNavigate();
  const errorCallback = (err) => {
    console.log("401에러 발생");
    const confirm = window.confirm('다시 로그인 해주세요.');
    if (confirm) {
      navigate('/login');
    }
  }

  const handleSendMailClick = async () => {
    if (!content) {                     
      console.log("쪽지 내용을 작성하세요");
      return;
    }
    try {
      const res = await sendMail(statusId, content, selectedImage, errorCallback);
      if (res) {
        closeMailModal();
        console.log('쪽지 전송 성공', res.data);
      }
    } catch (err) {
      console.log("쪽지 전송 실패", err);
    }
  }

// 사진 관련
const handleImageInputChange = async (e) => {
  const file = e.target.files[0];

  const maxSizeInBytes = 10 * 1024 * 1024; // 10MB
  const maxWidth = 800;  // 최대 너비
  const maxHeight = 600; // 최대 높이

  if (file) {
    try {
      // 이미지 압축을 위한 설정
      const options = {
        maxSizeMB: maxSizeInBytes / (1024 * 1024), // 이미지 크기 제한 (10MB)
        maxWidthOrHeight: Math.max(maxWidth, maxHeight),
      };

      // 이미지 압축을 수행하고 압축된 파일을 가져옴
      const compressedFile = await imageCompression(file, options);

      // 압축된 이미지를 선택된 이미지로 설정
      setSelectedImage(compressedFile);
      setIsEditingImage(true);

      // 압축된 이미지의 미리보기 URL 생성
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onload = () => {
        setImageSrc(reader.result || null);
      };
    } catch (error) {
      console.error("이미지 압축 중 에러", error);
    }
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
                onClick={() => imageInputRef.current.click()}
                className="text-gray-500"
              >
                사진 수정
              </button>
            ) : (
              <label 
                htmlFor="addPhoto"
                className="text-gray-500"
              >
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
            className="bg-gray-100 w-full h-60 px-5 mt-2 py-5 ownglyph-text text-xl text-left rounded-[16px]"
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