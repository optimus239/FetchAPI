import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getMovieDetail } from "../../store/quanLyPhim/quanLyPhimReducer";
import "./MovieDetail.css";
import moment from "moment";

const MovieDetail = () => {
  const dispatch = useDispatch();
  const { movieDetail } = useSelector((state) => state.quanLyPhimReducer);
  const param = useParams();
  console.log("param: ", param.movieIds);
  console.log("movieDetail: ", movieDetail);

  useEffect(() => {
    dispatch(getMovieDetail(param.movieIds));
  }, []);

  return (
    <div
      className="container mx-auto h-[1200px] bg-center bg-cover bg-repeat opacity-70 relative"
      style={{ backgroundImage: `url(${movieDetail?.hinhAnh})` }}
    >
      <div className="bg-movieDetail flex p-5">
        <div className="w-2/5 h-2/5 mr-3">
          <img
            src={movieDetail?.hinhAnh}
            alt={movieDetail?.biDanh}
            className=" object-cover"
          />
        </div>
        <div>
          <div className="font-bold text-3xl text-slate-200 mb-5">
            {movieDetail?.tenPhim}
          </div>
          <div className="text-slate-200 mb-5">
            {moment(movieDetail.ngayKhoiChieu).format("llll")}
          </div>
          <div className="text-slate-200 mb-5">{movieDetail.moTa}</div>
          <button className="font-bold text-xl">
            <a href={movieDetail.trailer} className="text-red-700">
              TRAILER
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
