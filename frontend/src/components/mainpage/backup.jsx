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