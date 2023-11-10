import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosConfig";
import { useNavigate } from 'react-router-dom';

const BestPhoto = ({ setTotalParticipants }) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const getPhotos = async () => {
      try {
        const response = await axiosInstance.get("/time/best");
        if (response.data && response.data.data) {
          setPhotos(response.data.data.bestImages);
          setTotalParticipants(response.data.data.totalParticipants);
        }
        console.log("베스트컷 왔니?", response);
        setLoading(false);
      } catch (error) {
        console.error("에러", error);
        setLoading(false);
        if (error.response && error.response.status === 401) {
          console.log('401 에러 발생');
          const confirm = window.confirm('다시 로그인 해주세요');
          if (confirm) {
            navigate('/login');
          }
        }
      }
    };

    getPhotos();
  }, [navigate]);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };

  return (
    <div className="px-5 bg-white h-[75vh]">
      {loading ? (
        <h4 className="text-center">Loading...</h4>
      ) : (
        <div className="bg-white shadow-xl">
          <div className="flex flex-col items-center">
            <div className="p-5 h-[50vh]">
              <img
                src={photos[currentPhotoIndex].imageAddress}
                alt={photos[currentPhotoIndex].title}
                className="object-cover object-center h-full w-full"
              />
            </div>

          <div className="w-full flex justify-between">
            <button 
              onClick={prevPhoto}
              className="font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {"<"}
            </button>
            <div className="ownglyph-text mt-8 mb-12 text-center text-xl">{photos[currentPhotoIndex].title}</div>
            <button 
              onClick={nextPhoto}
              className="font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {">"}
            </button>
          </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default BestPhoto;
