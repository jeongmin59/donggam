import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosConfig";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const BestPhoto = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPhotos = async () => {
      try {
        const response = await axiosInstance.get("/time/best");
        if (response.data && response.data.data) {
          setPhotos(response.data.data);
        }
        console.log("베스트컷 왔니?", response)
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
        <h5>Loading...</h5>
      ) : (
        <Carousel showThumbs={false} className="mt-10 p-8" autoPlay={true} infiniteLoop={true} interval={5000}>
          {photos.map((photo) => (
            <div key={photo.imageId} className="flex flex-col items-center">
              <img src={photo.imageAddress} alt={photo.title} className="mb-6 rounded-lg" />
              <h4 className="mb-12 text-center">{photo.title}</h4>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default BestPhoto;
