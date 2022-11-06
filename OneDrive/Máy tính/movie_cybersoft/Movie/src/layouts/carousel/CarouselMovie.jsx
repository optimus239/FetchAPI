import React, { useEffect } from "react";
import { Carousel } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getCarouselList } from "../../store/quanLyPhim";
import "./CarouselMovie.css";

const contentStyle = {
  height: "600px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};

const CarouselMovie = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCarouselList());
  }, []);
  const { carouselList } = useSelector((state) => state.quanLyPhimReducer);
  console.log("carouselList: ", carouselList);

  const renderCarousel = () => {
    return carouselList.map((item, index) => (
      <div key={index}>
        <div
          className="bg-carousel-top"
          style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }}
        ></div>
      </div>
    ));
  };

  return (
    <Carousel
      effect="fade"
      autoplay
      className="opacity-95 overflow-hidden carousel-movie"
    >
      {renderCarousel()}
    </Carousel>
  );
};

export default CarouselMovie;
