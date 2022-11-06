import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovieList } from "../../store/quanLyPhim/quanLyPhimReducer";
import Slider from "react-slick";
import styleSlick from "./MovieList.css";
import { Card } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";

const { Meta } = Card;

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}

var settings = {
  className: "center",
  centerMode: true,
  infinite: true,
  centerPadding: "160px",
  slidesToShow: 3,
  speed: 500,
  rows: 2,
  slidesPerRow: 1,
  variableWidth: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesPerRow: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesPerRow: 1,
        rows: 1,
      },
    },
    {
      breakpoint: 667,
      settings: {
        slidesToShow: 1,
        slidesPerRow: 1,
        rows: 1,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        rows: 1,
        // slidesPerRow: 1,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1,
        rows: 1,
        centerPadding: "0",
        // slidesPerRow: 1,
      },
    },
  ],
};

const MovieList = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    isShowing: true,
  });
  console.log(searchParams.get("isShowing"));
  const dispatch = useDispatch();
  const { movieList } = useSelector((state) => state.quanLyPhimReducer);
  console.log("movieList: ", movieList);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMovieList());
  }, []);

  const renderMovie = () =>
    movieList
      .filter(
        (val) => val.dangChieu.toString() === searchParams.get("isShowing")
      )
      .map((val) => (
        <div key={val.maPhim}>
          <Card
            hoverable
            className={`${styleSlick["width-item"]}`}
            cover={
              <img alt="example" src={val.hinhAnh} className="w-72 h-72" />
            }
          >
            <Meta title={val.tenPhim} />
            <button
              className="mt-5 btn-detail rounded-lg text-slate-200"
              onClick={() => navigate(`/detail/${val.maPhim}`)}
            >
              Chi tiết
            </button>
          </Card>
        </div>
      ));

  return (
    <div className="container mx-auto movie-list relative max-w-full overflow-hidden">
      <div className="btn-movie flex justify-center pt-5 text-center mb-[10px] ">
        <div
          className="btn-playing mr-24 w-1/6 text-2xl cursor-pointer"
          onClick={() => {
            setSearchParams({
              isShowing: true,
            });
          }}
        >
          <button className="text-playing mb-0 text-slate-400 w-full">
            Đang chiếu
          </button>
        </div>
        <div
          className="btn-coming ml-24 w-1/6 text-2xl text-center cursor-pointer"
          onClick={() => {
            setSearchParams({
              isShowing: false,
            });
          }}
        >
          <button className="text-coming mb-0 text-slate-400 w-full">
            Sắp chiếu
          </button>
        </div>
      </div>
      <Slider {...settings}>{renderMovie()}</Slider>
    </div>
  );
};

export default MovieList;
