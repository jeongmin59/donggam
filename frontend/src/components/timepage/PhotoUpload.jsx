import React, { useState } from "react";
import UploadButton from "../common/UploadButton";
import { useRecoilValue } from "recoil";
import { AccessTokenAtom } from "../../recoil/user/userAtom";
import axiosInstance from "../../api/axiosConfig";

const PhotoUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [previewURL, setPreviewURL] = useState(null);
  const token = useRecoilValue(AccessTokenAtom);

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
  
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleUpload = async () => {
    try {
      if (selectedFile) {
        // FormData 객체를 생성
        const formData = new FormData();
        formData.append("title", title);
        formData.append("img", selectedFile);

        const response = await axiosInstance.post(
          `/time`, formData, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // form-data로 지정
          },
        });

        console.log("업로드 성공:", response.data);
      } else {
        alert("사진을 첨부해주세요.");
      }
    } catch (error) {
      console.error("에러:", error);
    }
  };

  return (
    <div className="px-5 flex flex-col">
      <div className="mb-4">
        <label className="block text-sm text-gray-700">제목을 입력하세요.</label>
        <input
          type="text"
          className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring focus:border-blue-300"
          value={title}
          onChange={handleTitleChange}
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
        <UploadButton onUpload={handleUpload} to="/time" />
      </div>
    </div>
  );
};

export default PhotoUpload;
