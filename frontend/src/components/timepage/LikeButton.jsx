import React, { useState } from "react";
import axiosInstance from "../../api/axiosConfig";
import emptyLikeImg from "../../assets/like/empty_heart.png";
import fullLikeImg from "../../assets/like/full_heart.png";

const LikeButton = ({ imageId, isLiked, likeCount, onLike }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [newIsLiked, setNewIsLiked] = useState(isLiked);

  const handleLikeToggle = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);

    try {
      const response = await axiosInstance.post(`/time/${imageId}`);
      if (response.data && response.data.code === 200) {
        const { likeCount: updatedLikeCount, isLiked: updatedIsLiked } = response.data.data;
        setNewIsLiked(updatedIsLiked);
        // 새로운 likeCount를 PhotoDetail 컴포넌트로 전달
        onLike(updatedLikeCount);
      }
    } catch (error) {
      console.error("에러", error);
      if (error.response.status === 401) {
        console.log('401 에러 발생');
        const confirm = window.confirm('다시 로그인 해주세요');
        if (confirm) {
          navigate('/login');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleLikeToggle} disabled={isLoading}>
        {newIsLiked ? (
          <img src={fullLikeImg} alt="Full Heart" />
        ) : (
          <img src={emptyLikeImg} alt="Empty Heart" />
        )}
      </button>
    </div>
  );
};

export default LikeButton;
