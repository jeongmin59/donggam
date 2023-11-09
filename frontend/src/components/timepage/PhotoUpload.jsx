import React, { useState } from 'react';
import TitleInput from "./TitleInput";
import FileInput from "./FileInput";
import UploadButton from "../common/UploadButton";
import { useRecoilValue } from "recoil";
import { AccessTokenAtom } from "../../recoil/user/userAtom";
import axiosInstance from "../../api/axiosConfig";
import imageCompression from 'browser-image-compression';
import { useNavigate } from 'react-router-dom';

const PhotoUpload = () => {
  const [title, setTitle] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const token = useRecoilValue(AccessTokenAtom);
  const navigate = useNavigate();

  // 제목 바뀌는 거 관련
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  // 사진 관련
  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    const maxSizeInBytes = 10 * 1024 * 1024; // 10MB
    const maxWidth = 800;  // 최대 너비
    const maxHeight = 600; // 최대 높이

    if (file) {
      try {
        const options = {
          maxSizeMB: maxSizeInBytes / (1024 * 1024), // 이미지 크기 제한 (10MB)
          maxWidthOrHeight: Math.max(maxWidth, maxHeight),
        };

        const compressedFile = await imageCompression(file, options);   // 압축된 파일
        const previewUrl = URL.createObjectURL(compressedFile);   // 미리보기 저장

        setPreviewUrl(previewUrl);
        setSelectedFile(compressedFile);
      } catch (error) {
        console.error("이미지 압축 중 에러", error);
      }
    }
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("img", selectedFile);

      const response = await axiosInstance.post(`/time`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("업로드 성공!!", response.data);
      
      navigate('/time');
    } catch (error) {
      console.error("에러", error);
      if (error.response.status === 401) {
        console.log('401 에러 발생');
        const confirm = window.confirm('다시 로그인 해주세요');
        if (confirm) {
          navigate('/login');
        }
      }
    }
  };

  return (
    <div className="px-5 flex flex-col bg-white h-screen">
      <FileInput previewUrl={previewUrl} onFileChange={handleFileChange} />
      <TitleInput title={title} onTitleChange={handleTitleChange} />

      {title && selectedFile && (
        <div className="bottom-1 left-0 right-0 p-4">
          <UploadButton onUpload={handleUpload}/>
        </div>
      )}
    </div>
  );
};

export default PhotoUpload;
