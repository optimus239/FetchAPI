import React, { useState, useEffect, useRef } from "react";
import { Radio, Space, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getCinemaList } from "../../store/quanLyPhim/quanLyPhimReducer";
import "./Cinemas.css";
import { render } from "react-dom";
import "./Cinemas.css";
import moment from "moment";

const Cinemas = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCinemaList());
  }, []);

  const { cinemaList } = useSelector((state) => state.quanLyPhimReducer);
  console.log("cinemaList: ", cinemaList);
  const [mode, setMode] = useState("left");
  const handleModeChange = (e) => {
    setMode(e.target.value);
  };

  return (
    <div className="flex">
      <Tabs
        className="container"
        defaultActiveKey="1"
        tabPosition={mode}
        style={{
          height: 8274,
        }}
        items={cinemaList.map((listCinema, id) => {
          return {
            label: <img src={listCinema.logo} alt="" className="w-9 h-9" />,
            key: id,
            children: (
              <Tabs
                className="container"
                defaultActiveKey="1"
                tabPosition={mode}
                style={{
                  height: 500,
                }}
                items={listCinema.lstCumRap.map((item, id) => {
                  return {
                    label: (
                      <div className="flex" key={id}>
                        <img
                          src={item.hinhAnh}
                          alt=""
                          className="w-20 h-20 mr-5"
                        />
                        <div className="text-left">
                          <p>{item.tenCumRap}</p>
                          <button>Chi tiết</button>
                        </div>
                      </div>
                    ),
                    key: id,
                    children: item.danhSachPhim.map((val, id) => (
                      <div key={id}>
                        <div className="my-3 flex">
                          <div>
                            {" "}
                            <img
                              src={val.hinhAnh}
                              alt=""
                              className="w-28 h-28"
                            />
                          </div>
                          <div>
                            {" "}
                            <p>{val.tenPhim}</p>
                            <div className="grid grid-cols-5">
                              {val.lstLichChieuTheoPhim.map((item, id) => (
                                <p key={id}>
                                  {moment(item.ngayChieuGioChieu).format(
                                    "llll"
                                  )}
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
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
  );
};

export default Cinemas;
