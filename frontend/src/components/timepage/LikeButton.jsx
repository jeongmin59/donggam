import React, { useState } from "react";
import axiosInstance from "../../api/axiosConfig";
import emptyLikeImg from "../../assets/like/empty_heart.png";
import fullLikeImg from "../../assets/like/full_heart.png";

const LikeButton = ({ imageId, isLiked, likeCount }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [newIsLiked, setNewIsLiked] = useState(isLiked);
  // const [newLikeCount, setNewLikeCount] = useState(likeCount);

  const handleLikeToggle = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    window.location.reload();

    try {
      const response = await axiosInstance.post(`/time/${imageId}`);
      if (response.data && response.data.code === 200) {
        console.log(response.data);
        // 새로운 likeCount 및 isLiked를 가져옴
        const { likeCount: updatedLikeCount, isLiked: updatedIsLiked } = response.data.data;
        setNewIsLiked(updatedIsLiked);
        // setNewLikeCount(updatedLikeCount);
      }
    } catch (error) {
      console.error("에러", error);
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
      {/* <span>{newLikeCount} Likes</span> */}
    </div>
  );
};

export default LikeButton;
