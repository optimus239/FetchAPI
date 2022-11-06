import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getSeatList,
  getCheckedList,
  postCheckOut,
  changeKey,
  resetTab,
} from "../../store/quanLyDatVe/quanLyDatVeReducer";
import "./Checkout.css";
import { CloseOutlined, UsbOutlined, UserOutlined } from "@ant-design/icons";
import _ from "lodash";
import { NumericFormat } from "react-number-format";
import { inforCustomer, useQuanLyNguoiDung } from "../../store/quanLyNguoiDung";
import { Tabs } from "antd";
import moment from "moment";
import { Skeleton } from "antd";

const Checkout = () => {
  const dispatch = useDispatch();
  const param = useParams();
  console.log("param: ", param.movieIds);
  useEffect(() => {
    dispatch(getSeatList(param.movieIds));
  }, []);
  const { seatList, checkedList, isFetching } = useSelector(
    (state) => state.quanLyDatVeReducer
  );
  console.log("checkedList: ", checkedList);
  console.log("seatList: ", seatList);
  const { userLogin } = useQuanLyNguoiDung();
  const { customer } = useQuanLyNguoiDung();

  const [buttonShape, setButtonShape] = useState("circle");
  const [size, setSize] = useState("small");

  if (isFetching) {
    return (
      <div className="container">
        <div>
          <div className=" mt-10 flex text-center ml-[25%] mb-28">
            <Skeleton.Button
              className="mr-1"
              shape={buttonShape}
              size={size}
              active
            />
            <Skeleton.Button
              className="mr-1"
              size={size}
              shape={buttonShape}
              active
            />
            <Skeleton.Button
              className="mr-1"
              size={size}
              shape={buttonShape}
              active
            />
          </div>
        </div>
      </div>
    );
  }

  const renderSeat = () => {
    return seatList.danhSachGhe?.map((seat, id) => {
      let classVipSeat = seat?.loaiGhe === "Vip" ? "vipSeat" : "";
      let classAvailableSeat = seat?.daDat === true ? "availableSeat" : "";
      let classCheckedSeat = "";
      //kt ghế có trong mản ghế đang đặt ?
      let iCheckedSeat = checkedList.findIndex(
        (checkedSeat) => checkedSeat.maGhe === seat.maGhe
      );

      let classSeatBy = "";
      if (userLogin.taiKhoan === seat.taiKhoanNguoiDat) {
        classSeatBy = "availableSeatBy";
      }

      if (iCheckedSeat != -1) {
        classCheckedSeat = "selectedSeat";
      }

      return (
        <Fragment key={id}>
          <button
            className={`seat ${classVipSeat} ${classAvailableSeat} ${classCheckedSeat} ${classSeatBy} `}
            onClick={() => dispatch(getCheckedList(seat))}
          >
            {seat.daDat ? (
              classSeatBy != "" ? (
                <UserOutlined />
              ) : (
                <CloseOutlined />
              )
            ) : (
              seat?.stt
            )}
          </button>
        </Fragment>
      );
    });
  };

  return (
    <div className="container mx-auto min-h-screen">
      <div className="grid grid-cols-12">
        <div className="col-span-9">
          <div></div>
          <div className="display-cinema">
            <h3 className="mb-0 text-red-50 text-lg">Màn hình</h3>
          </div>
          <div>{renderSeat()}</div>
        </div>
        <div className="col-span-3">
          <h3 className="text-center text-2xl text-green-500">
            <NumericFormat
              className="text-center total-price-top"
              allowLeadingZeros
              thousandSeparator=","
              value={checkedList.reduce((total, seat, i) => {
                return (total += seat?.giaVe);
              }, 0)}
            />
          </h3>
          <hr />
          <h3 className="text-xl">Phim: {seatList?.thongTinPhim?.tenPhim}</h3>
          <p>Địa điểm: {seatList?.thongTinPhim?.diaChi}</p>
          <p>Ngày chiếu: {seatList?.thongTinPhim?.ngayChieu}</p>
          <hr />
          <div className="my-5 flex flex-wrap">
            <div className="w-full flex flex-wrap">
              <span className="text-lg mr-3  infor-seat">Ghế: </span>
              {_.sortBy(checkedList, ["maGhe"]).map((seat, i) => {
                return (
                  <span key={i} className="text-green-500 text-xl mr-2">
                    {seat.stt}
                  </span>
                );
              })}
            </div>
            <div className="text-right checkout-total-price flex ">
              <span className="text-lg total">Total: </span>
              <span className="text-green-400 text-lg">
                <NumericFormat
                  className="text-end total-price mr-6"
                  allowLeadingZeros
                  thousandSeparator=","
                  value={checkedList.reduce((total, seat, i) => {
                    return (total += seat.giaVe);
                  }, 0)}
                />
                <span className="mr-6 price-vnd">VND</span>
              </span>
            </div>
          </div>
          <hr />
          <div className="my-5 checout-email">
            <i className="infor-email">Email:</i>
            <span className="text-green-400 text-xl ml-5">
              {customer?.email}
            </span>
          </div>
          <hr />
          <div className="my-5 checkout-phone">
            <i className="infor-phone">Phone:</i>
            <span className="text-green-400 text-xl ml-5">
              {customer?.soDT}
            </span>
          </div>
          <hr />
          <div className="mb-0 flex flex-col justify-end">
            <button
              className="btn-checkout mt-3 w-full text-center py-3 font-bold text-lg"
              onClick={() => {
                const inforCheckOut = {
                  maLichChieu: param.movieIds,
                  danhSachVe: checkedList,
                };
                dispatch(postCheckOut(inforCheckOut));
                // dispatch(getSeatList(param.movieIds));
              }}
            >
              Đặt vé
            </button>
          </div>
          <div className="mt-5 flex justify-center">
            <div className="bg-white divide-y divide-gray-200">
              <div className="text-black font-semibold">Ghế chưa đặt</div>
              <button className="seat">00</button>
              <div className="text-black font-semibold">Ghế đang đặt</div>
              <button className="seat availableSeat">
                <CloseOutlined />
              </button>
              <div className="text-black font-semibold">Ghế đã được đặt</div>
              <button className="seat availableSeatBy">
                <UserOutlined />
              </button>
              <div className="text-black font-semibold">Ghế VIP</div>
              <button className="seat vipSeat">00</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// const onChange = (key) => {
//   console.log(key);
// };

export default function () {
  const { tabActive } = useSelector((state) => state.quanLyDatVeReducer);
  const dispatch = useDispatch();

  return (
    <div className="p-5 overflow-hidden max-w-full checkout-seat">
      <Tabs
        defaultActiveKey="1"
        activeKey={tabActive}
        onChange={(key) => {
          dispatch(changeKey({ number: key.toString() }));
        }}
        items={[
          {
            label: (
              <p className="mb-0 text-lg font-semibold">
                1. Chọn ghế thanh toán
              </p>
            ),
            key: "1",
            children: <Checkout />,
          },
          {
            label: (
              <p className="mb-0 text-lg font-semibold">2. Kết quả đặt vé</p>
            ),
            key: "2",
            children: KetQuaDatVe(),
          },
        ]}
      />
    </div>
  );
}

const KetQuaDatVe = () => {
  const dispatch = useDispatch();
  const { customer } = useQuanLyNguoiDung();
  console.log("inforCustomer: ", customer);
  useEffect(() => {
    dispatch(inforCustomer());
  }, []);

  const renderTicketItem = () =>
    customer?.thongTinDatVe.map((ticket, i) => (
      <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={i}>
        <div className="h-full flex border-gray-200 border p-4 rounded-lg items-start">
          <img
            alt="team"
            className="w-20 h-20 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
            src={ticket?.hinhAnh}
          />
          <div className="flex-grow">
            <h2 className="text-gray-900 title-font font-bold ml-[15px] text-base">
              {ticket.tenPhim}
            </h2>
            <p className="ml-[15px]">
              <b>Giờ chiếu:</b> {moment(ticket.ngayDat).format("hh:mm A")}
            </p>
            <p className="ml-[15px]">
              <b>Ngày chiếu:</b> {moment(ticket.ngayDat).format("DD-MM-YYYY")}
            </p>
            <p className="ml-[15px]">
              <b>Địa điểm:</b> {_.first(ticket.danhSachGhe).tenHeThongRap}
            </p>
            <p className="ml-[15px]">
              <b>Rạp:</b> {_.first(ticket.danhSachGhe).tenCumRap}
            </p>
            <p className="ml-[15px]">
              <b>Ghế:</b>
            </p>
            <p>
              {_.sortBy(ticket.danhSachGhe, ["tenGhe"]).map((seat, i) => (
                <button className="mr-2 seat availableSeatBy" key={i}>
                  {seat.tenGhe}
                </button>
              ))}
            </p>
          </div>
        </div>
      </div>
    ));

  return (
    <div className="p-5 relative">
      <section className="text-gray-600 body-font">
        <div className="container mx-auto">
          <div className="flex flex-col text-center w-full mb-5">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-purple-600">
              Đặt vé thành công!
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Cảm ơn quý khách đã lựa chọn dịch vụ của Cybersoft Movie.
            </p>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base mb-0 checkout-thanks">
              Quý khách hàng vui lòng kiểm tra lại thông tin các vé đã đặt bên
              dưới.
            </p>
          </div>
          <div className="flex flex-wrap -m-2">{renderTicketItem()}</div>
        </div>
      </section>
      <Link to="/" className="absolute button-back-home top-0 right-0">
        <button
          className="border rounded-md btn-back-home font-semibold text-base"
          role="button"
          onClick={() => {
            dispatch(resetTab({ number: "1" }));
          }}
        >
          Quay về trang chủ
        </button>
      </Link>
    </div>
  );
};
