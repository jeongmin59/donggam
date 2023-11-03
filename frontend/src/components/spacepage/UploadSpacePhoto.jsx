import React, { useState, useRef } from "react";
import UploadIcon from "../../assets/icons/upload-icon.svg"

const UploadSpacePhoto = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const imageInputRef = useRef(null);

  // 사진 첨부 
  const handleImageInputChange = (e) => {
    if (e.target.files.length > 0) {
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

  return(
    <>
      <label
        htmlFor="addPhoto"
        className="photo-frame"
      >
        {selectedImage ? (
          <img src={imageSrc} alt="Uploaded Image" className="photo-img-frame" />
        ) : (
          <div className="">
            <div className="flex justify-center mb-1"><img src={UploadIcon}/></div>
            <span>사진을 올려주세요</span>
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