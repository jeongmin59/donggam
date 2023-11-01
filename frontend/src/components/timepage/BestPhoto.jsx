import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosConfig";

const BestPhoto = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPhotos = async () => {
      try {
        const response = await axiosInstance.get("/time/best");
        if (response.data && response.data.data) {
          setPhotos(response.data.data);
          console.log('왔니?', response);
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
    <div className="px-5">
      {loading ? (
        <p>Loading...</p>
      ) : (
        photos.map((photo) => (
          <div key={photo.imageId}>
            <img src={photo.imageAddress} alt={photo.title} className="rounded-lg" />
            <h5 className="mt-1">{photo.title}</h5>
          </div>
        ))
      )}
    </div>
  );
};

export default BestPhoto;
