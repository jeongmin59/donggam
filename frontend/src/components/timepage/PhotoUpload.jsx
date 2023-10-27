import React, { useState } from "react";
import UploadButton from "../common/UploadButton";

const PhotoUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    
    // 파일 선택 시 미리보기 생성
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewURL(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      console.log("선택된 파일:", selectedFile);
    } else {
      alert("사진을 첨부해주세요.");
    }
  };

  return (
    <div className="px-5 flex flex-col">
      <div className="mb-4">
        <label className="block text-sm text-gray-700">제목을 입력하세요.</label>
        <input
          type="text"
          className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <div className="mb-4">
        <div className="mt-2 h-80 flex flex-col items-center justify-center rounded-lg border focus:outline-none focus:ring focus:border-blue-300 px-6 py-10">
          {/* 이미지 미리보기 */}
          {previewURL && (
            <img
              src={previewURL}
              alt="미리보기"
              className="mx-auto max-h-40 overflow-y-auto"
            />
          )}
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2focus-within:ring-offset-2 hover:text-indigo-500"
              >
              <p>사진을 첨부해주세요.</p>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleFileChange}
              />
            </label>
          </div>
          <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>
      <div className="fixed bottom-3 left-0 right-0 p-4">
        <UploadButton onUpload={handleUpload} />
      </div>
    </div>
  );
};

export default PhotoUpload;
