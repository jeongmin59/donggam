import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosConfig";
import LikeButton from "../../components/timepage/LikeButton";

const PhotoDetail = () => {
  const { imageId } = useParams();
  const [photoData, setPhotoData] = useState(null);

  useEffect(() => {
    const getPhotoDetail = async () => {
      try {
        const response = await axiosInstance.get(`/time/${imageId}`);
        if (response.data && response.data.code === 200) {
          setPhotoData(response.data.data);
        }
      } catch (error) {
        console.error("에러", error);
      }
    };

    getPhotoDetail();
  }, [imageId]);

  return (
    <div>
      {photoData ? (
        <div>
          <img src={photoData.imageAddress} alt={photoData.title} />
          <h3>{photoData.title}</h3>
          <p>캐릭터: {photoData.authorCharacterId}</p>
          <LikeButton imageId={imageId} isLiked={photoData.isLiked} likeCount={photoData.likeCount} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PhotoDetail;
