import React, { useState, useEffect, useRef } from "react";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getCinemaList } from "../../store/quanLyRap/quanLyRapReducer";
import "./Cinemas.css";
import "./Cinemas.css";
import moment from "moment";
import "../../../node_modules/moment/locale/vi.js";

const Cinemas = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCinemaList());
  }, []);

  const { cinemaList } = useSelector((state) => state.quanLyRapReducer);
  console.log("cinemaList: ", cinemaList);
  const onChange = (key) => {
    console.log(key);
  };

  return (
    <div className="flex container mx-auto cinema-list pt-20 pb-20 overflow-hidden px-6 max-w-full">
      <div className="tab-cinema w-full">
        <Tabs
          defaultActiveKey="1"
          onChange={onChange}
          centered="true"
          items={cinemaList.map((listCinema, id) => {
            return {
              label: (
                <a className="logo-cinema" key={id}>
                  <img
                    src={listCinema.logo}
                    alt=""
                    className="w-9 h-9 mx-10 active:scale-125"
                  />
                </a>
              ),
              key: id,
              children: (
                <Tabs
                  className="container cinema-detail"
                  defaultActiveKey="1"
                  onChange={onChange}
                  items={listCinema.lstCumRap.map((item, id) => {
                    return {
                      label: (
                        <div className="flex card-cinema" key={id}>
                          <img
                            src={item.hinhAnh}
                            alt=""
                            className="w-16 h-16 mr-5"
                          />
                          <div className="text-left-cinema">
                            <p className="name-cinema">{item.tenCumRap}</p>
                            <button>Chi tiết</button>
                          </div>
                        </div>
                      ),
                      key: id,
                      children: item.danhSachPhim.map((val, id) => (
                        <div key={id}>
                          <div className="my-3 flex cinema-detail">
                            <div>
                              <img
                                src={val.hinhAnh}
                                alt=""
                                className="img-film-cinema w-52 h-52 rounded-md mr-5"
                              />
                            </div>
                            <div className="ml-3">
                              <p className="text-2xl text-zinc-300 font-bold">
                                {val.tenPhim}
                              </p>
                              <div className="grid grid-cols-5">
                                {val.lstLichChieuTheoPhim.map((item, id) => (
                                  <button
                                    className="border-gray-50 border-solid border mr-3 mb-3 rounded-md text-slate-700 p-1 btn-date-cinema"
                                    key={id}
                                  >
                                    {moment(item.ngayChieuGioChieu).format(
                                      "llll"
                                    )}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="dashed"></div>
                        </div>
                      )),
                    };
                  })}
                />
              ),
            };
          })}
        />
      </div>
    </div>
  );
};

export default Cinemas;
