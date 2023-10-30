import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosConfig";

const PhotoList = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPhotos = async () => {
      try {
        const response = await axiosInstance.get("/time");
        if (response.data && response.data.data) {
          setPhotos(response.data.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("에러", error);
        setLoading(false);
      }
    };

    getPhotos();
  }, []);

  return (
    <div className="px-6">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {photos.map((photo) => (
            <div key={photo.imageId}>
              <img src={photo.imageAddress} alt={photo.title} />
              <h3>{photo.title}</h3>
              <p>{photo.isLiked ? "Liked" : "Not Liked"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoList;
