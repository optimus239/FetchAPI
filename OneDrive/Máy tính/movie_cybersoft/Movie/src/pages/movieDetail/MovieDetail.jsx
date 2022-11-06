import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieDetail } from "../../store/quanLyPhim/quanLyPhimReducer";
import "./MovieDetail.css";
import moment from "moment";
import "../../assets/index";
import { Tabs } from "antd";
import { getShowTimes } from "../../store/quanLyRap/quanLyRapReducer";
import { Rate } from "antd";

const MovieDetail = () => {
  const dispatch = useDispatch();
  const { movieDetail } = useSelector((state) => state.quanLyPhimReducer);
  const param = useParams();
  console.log("param: ", param.movieIds);
  console.log("movieDetail: ", movieDetail);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getMovieDetail(param.movieIds));
  }, []);
  useEffect(() => {
    dispatch(getShowTimes(param.movieIds));
  }, []);
  const { showTimesList } = useSelector((state) => state.quanLyRapReducer);
  console.log("showTimesList: ", showTimesList);

  const [mode, setMode] = useState("left");
  const handleModeChange = (e) => {
    setMode(e.target.value);
  };

  const [toggleTabs, setToggleTabs] = useState(2);
  const toggleTab = (index) => {
    setToggleTabs(index);
    console.log("setToggleTabs: ", setToggleTabs);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto h-full relative justify-center max-w-full">
      <div>
        <img
          className="absolute inset-0 h-full w-full object-cover opacity-40 z-[-1]"
          src={movieDetail?.hinhAnh}
        ></img>
      </div>
      <div className="p-[5%]">
        <div className="movie-detail h-full p-3">
          <div className="movie-detail-top flex mb-12 w-full">
            <div className="w-4/12 mr-9 movie-detail-img">
              <img
                src={movieDetail?.hinhAnh}
                alt={movieDetail?.biDanh}
                className="w-full h-full rounded-lg"
              />
            </div>
            <div className="movie-description w-8/12">
              <h1 className="font-bold text-3xl text-slate-200 mb-5 movie-name">
                {movieDetail?.tenPhim}
              </h1>
              <div className="mb-5 text-zinc-200 font-semibold text-lg">
                {moment(movieDetail?.ngayKhoiChieu).format("llll")}
              </div>
              <div className="border rounded flex detail-trailer justify-center p-3 detail-trailer mb-5">
                <button
                  className={toggleTabs === 1 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(1)}
                >
                  <a className="text-cyan-400">Chi tiết</a>
                </button>
                <button
                  className={
                    toggleTabs === 2
                      ? "btn-movie-trailer trailer-active"
                      : "btn-movie-trailer"
                  }
                  onClick={() => toggleTab(2)}
                >
                  <a
                    className="text-cyan-400"
                    href={movieDetail?.trailer}
                    target="_blank"
                  >
                    Trailer
                  </a>
                </button>
              </div>
              <div
                className={
                  toggleTabs === 1 ? "movie-des active-content" : "movie-des"
                }
              >
                {movieDetail?.moTa}
              </div>
              <div className="clearfix">
                <div className={`c100 p${movieDetail?.danhGia * 10}`}>
                  <span>{movieDetail?.danhGia * 10}%</span>
                  <div className="slice">
                    <div className="bar" />
                    <div className="fill" />
                  </div>
                </div>
                <Rate
                  allowClear={true}
                  allowHalf
                  value={movieDetail?.danhGia / 2}
                />
              </div>
            </div>
          </div>
          <div className="tabShowtime">
            <div className="text-2xl font-semibold text-gray-300 ">
              <p className="decoration-solid underline-offset-8 text-red-500 font-extrabold">
                Lịch chiếu
              </p>
            </div>
            <div>
              {showTimesList?.heThongRapChieu?.length > 0 ? (
                <Tabs
                  defaultActiveKey="1"
                  tabPosition={mode}
                  items={showTimesList?.heThongRapChieu.map((val, i) => {
                    return {
                      label: (
                        <img
                          src={val.logo}
                          alt=""
                          className="w-9 h-9"
                          key={i}
                        />
                      ),
                      key: i,
                      children: val.cumRapChieu.map((item, i) => (
                        <div key={i}>
                          <div className="flex w-full showtime-detail">
                            <div className="w-2/12 mr-5 showtime-detail-img ">
                              <img
                                src={item.hinhAnh}
                                alt=""
                                className="mb-5 mr-5 rounded-md img-cinema-showtime"
                              />
                            </div>
                            <div className="w-10/12">
                              <div className="text-neutral-50 text-xl mb-3">
                                {item.tenCumRap}
                              </div>
                              <div className="text-neutral-200 text-lg mb-3">
                                {item.diaChi}
                              </div>
                              <div className="grid grid-cols-7 movie-detail-time">
                                {item.lichChieuPhim.map((lichChieu, i) => (
                                  <button
                                    className="mr-5 border rounded mb-3 btn-date-movie text-zinc-700"
                                    key={i}
                                    onClick={() => {
                                      if (localStorage.getItem("USER_LOGIN")) {
                                        return navigate(
                                          `/ticketroom/${lichChieu.maLichChieu}`
                                        );
                                      } else navigate("/login");
                                    }}
                                  >
                                    {moment(lichChieu.ngayChieuGioChieu).format(
                                      "lll"
                                    )}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                          <br />
                        </div>
                      )),
                    };
                  })}
                />
              ) : (
                <p className="text-xl text-slate-200">
                  Hiện chưa có lịch chiếu cho phim
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
