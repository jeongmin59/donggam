import React, { useState, useRef } from "react";
import UploadIcon from "../../assets/icons/upload-icon.svg"
import imageCompression from 'browser-image-compression';


const UploadSpacePhoto = ({ image, setImage }) => {
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const imageInputRef = useRef(null);


  const handleImageInputChange = async (e) => {
    if (e.target.files.length > 0) {
      const originPhoto = e.target.files[0];
      const maxSizeInBytes = 10 * 1024 * 1024; // 10MB
      const maxWidth = 800; // 최대 너비
      const maxHeight = 600; // 최대 높이

      if (originPhoto) {
        try {
          const options = {
            maxSizeMB: maxSizeInBytes / (1024 * 1024), // 이미지 크기 제한 (10MB)
            maxWidthOrHeight: Math.max(maxWidth, maxHeight),
          };

          const compressedFile = await imageCompression(originPhoto, options); // 압축된 파일
          setImage(compressedFile);
          setIsEditingImage(true);

          // 미리보기
          const reader = new FileReader();
          reader.readAsDataURL(originPhoto);
          reader.onload = () => {
            setImageSrc(reader.result || null);
          };
        } catch (err) {
          // console.error("이미지 압축 실패", err);
        }
      }
    }
  };




  return (
    <>
      <label
        htmlFor="addPhoto"
        className="photo-frame"
      >
        {image ? (
          <img src={imageSrc} alt="Uploaded Image" className="photo-img-frame" />
        ) : (
          <div className="">
            <div className="flex justify-center mb-1"><img src={UploadIcon} /></div>
            <span className="text-gray-400">사진 업로드</span>
          </div>
        )}
      </label>
      <input
        className="hidden"
        type="file"
        accept="image/*"
        id="addPhoto"
        ref={imageInputRef}
        onChange={handleImageInputChange}
      />
    </>
  );
};

export default UploadSpacePhoto;