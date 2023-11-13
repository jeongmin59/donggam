import React, { useState, useEffect, useRef, useCallback } from "react";
import axiosInstance from "../../api/axiosConfig";
import { Link } from "react-router-dom";
import Masonry from "react-masonry-component";
import fullLikeImg from "../../assets/like/full_heart.png";
import nullLogo from "../../assets/images/noPhoto.svg";
import CreateBtn from "../timepage/CreateBtn";

const PhotoList = ({
  setTotalParticipants,
  totalParticipants,
  remainTime,
  isBestTime,
}) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayData, setDisplayData] = useState([]); // 현재 화면에 보여줄 데이터
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지

  const itemsPerPage = 10;
  const containerRef = useRef(null);

  // 스크롤 이벤트 핸들러
  const checkScroll = useCallback(() => {
    if (!photos.length) return; // photos 비어있으면 종료
    const scrollTop = window.scrollY;
    const clientHeight = window.innerHeight;
    const scrollHeight = document.body.offsetHeight;
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 5;
    if (isNearBottom) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [photos]);
  useEffect(() => {
    setDisplayData(photos.slice(0, itemsPerPage * (currentPage + 1)));
  }, [photos, currentPage]);

  useEffect(() => {
    //스크롤 이벤트 등록
    window.addEventListener("scroll", checkScroll);

    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, [checkScroll]);

  useEffect(() => {
    const getPhotos = async () => {
      try {
        const response = await axiosInstance.get("/time");
        if (response.data && response.data.data) {
          setPhotos(response.data.data);
          setTotalParticipants(response.data.data.length);
          // console.log('왔니?', response);
        }
        setLoading(false);
      } catch (error) {
        // console.error("에러", error);
        setLoading(false);
      }
    };

    getPhotos();
  }, []);

  const masonryOptions = {
    itemSelector: ".masonry-grid-item",
    transitionDuration: 0,
  };

  return (
    <div className="h-[75vh] bg-white px-5">
      {loading ? (
        <h4 className="text-center">Loading...</h4>
      ) : photos.length === 0 ? (
        <img src={nullLogo} alt="No Photos" className="mx-auto py-8" />
      ) : (
        <Masonry
          className={"my-gallery-class max-h-[calc(100vh-300px)] overflow-auto"}
          options={masonryOptions}
        >
          {displayData.map((photo) => (
            <div
              key={photo.imageId}
              className="masonry-grid-item "
              style={{ width: "50%" }}
            >
              <Link
                to={`/time/${photo.imageId}`}
                state={{ isBestTime, totalParticipants, remainTime }}
                className="relative m-2 flex flex-col items-center"
              >
                <div className="overflow-hidden">
                  <img
                    src={photo.imageAddress}
                    alt={photo.title}
                    className="rounded-lg"
                  />
                  {photo.isLiked ? (
                    <img
                      src={fullLikeImg}
                      alt="Liked"
                      className="absolute left-0 top-0 m-3"
                    />
                  ) : null}
                </div>
                <h5 className="mt-1">{photo.title}</h5>
              </Link>
            </div>
          ))}
        </Masonry>
      )}
      <CreateBtn to="/time/upload" />
    </div>
  );
};

export default PhotoList;
