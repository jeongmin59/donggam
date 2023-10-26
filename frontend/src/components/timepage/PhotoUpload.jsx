import React, { useState } from "react";
import UploadButton from "./UploadButton";

const PhotoUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      console.log("선택된 파일:", selectedFile);
    } else {
      alert("파일을 선택하세요.");
    }
  };

  return (
    <div className="px-5">{/* 패딩 적용 */}
      <div className="mb-4">
        <label className="block text-sm text-gray-700">제목을 입력하세요.</label>
        <input
          type="text"
          className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <div className="mb-4">
        <div className="mt-2 flex flex-col items-center justify-center rounded-lg border focus:outline-none focus:ring focus:border-blue-300 px-6 py-10">
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
            >
              <p>사진을 올려주세요.</p>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleFileChange} // 파일 선택 시 handleFileChange 함수 호출
              />
            </label>
          </div>
          <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>

      <UploadButton onUpload={handleUpload} />
    </div>
  );
};

export default PhotoUpload;
