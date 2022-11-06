import _ from "lodash";
import moment from "moment";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { inforCustomer, useQuanLyNguoiDung } from "../../store/quanLyNguoiDung";

const TicketInfor = () => {
  const { customer } = useQuanLyNguoiDung();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(inforCustomer());
  }, []);

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-4 mx-auto">
          <div className="flex flex-col text-center w-full mb-8">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              THÔNG TIN ĐẶT VÉ
            </h1>
          </div>
          <div className="flex flex-wrap -m-2">
            {customer?.thongTinDatVe.map((ticket, index) => {
              const seats = _.first(ticket.danhSachGhe);
              return (
                <div key={index} className="p-2 lg:w-1/2 md:w-1/2 w-full">
                  <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                    <img
                      alt="team"
                      className="w-[120px] h-[120px] bg-gray-100 object-cover object-center flex-shrink-0  mr-4"
                      src={ticket.hinhAnh}
                    />
                    <div className="flex-grow">
                      <h2 className="text-gray-900 title-font font-medium">
                        {ticket.tenPhim}
                      </h2>
                      <div className="text-gray-500">
                        <span>Ngày chiếu: </span>
                        {moment(ticket.ngayDat).format("DD-MM-YYYY")}
                        <br />
                        <span>Giờ chiếu: </span>
                        {moment(ticket.ngayDat).format("hh-mm A")}
                        <br />
                        <span>Rạp: </span>
                        {seats.tenHeThongRap} <br />
                        <span>Ghế: </span>
                        {ticket.danhSachGhe.map((ghe, index) => (
                          <span className="text-blue-400 mr-2" key={index}>
                            {ghe.tenGhe}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TicketInfor;
