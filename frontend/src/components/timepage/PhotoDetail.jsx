import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosConfig";
import LikeButton from "../../components/timepage/LikeButton";
import fullLikeImg from "../../assets/like/full_heart.png";

const PhotoDetail = () => {
  const { imageId } = useParams();
  const [photoData, setPhotoData] = useState(null);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const getPhotoDetail = async () => {
      try {
        const response = await axiosInstance.get(`/time/${imageId}`);
        if (response.data && response.data.code === 200) {
          setPhotoData(response.data.data);
          setLikeCount(response.data.data.likeCount);
        }
      } catch (error) {
        // console.error("에러", error);
      }
    };

    getPhotoDetail();
  }, [imageId]);

  const handleLikeCountUpdate = (updatedLikeCount) => {
    setLikeCount(updatedLikeCount);
  };

  return (
    <div className="px-5 pt-4 mb-8 flex items-center justify-center">
      {photoData ? (
        <div className="max-w-fit h-1/2 bg-white rounded-xl shadow-xl p-8 text-center">
          <img
            src={photoData.imageAddress}
            alt="해당 유저가 업로드한 이미지"
            className="w-2/3 h-2/3 mx-auto mb-2 rounded-lg"
          />
          <h4 className="mt-5 mb-3">{photoData.title}</h4>
          <LikeButton
            imageId={imageId}
            isLiked={photoData.isLiked}
            likeCount={likeCount}
            onLike={handleLikeCountUpdate} // LikeButton에서 호출될 함수
          />

          <div className="flex items-center justify-end">
            <h5>
              {likeCount}
              <img src={fullLikeImg} alt="Full Heart" className="w-4" />
            </h5>
            <img
              src={`/character/${photoData.authorCharacterId}.svg`}
              alt={`${photoData.authorCharacterId}번 캐릭터`}
              className="w-10 ml-2"
            />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PhotoDetail;
