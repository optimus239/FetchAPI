import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  capNhatThongTinNguoiDungTaiKhoan,
  layThongTinNguoiDung,
  useQuanLyNguoiDung,
} from "../../store/quanLyNguoiDung";

const Info = () => {
  const userLogin = JSON.parse(localStorage.getItem("USER_LOGIN"));
  const { userDetail } = useQuanLyNguoiDung();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(layThongTinNguoiDung(userLogin.taiKhoan));
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    defaultValues: {},
  });

  useEffect(() => {
    reset(userDetail);
  }, [userDetail]);
  const onSubmit = (data) => {
    dispatch(capNhatThongTinNguoiDungTaiKhoan(data));
  };
  return (
    <div>
      {/* component */}
      <section className="py-10 bg-gray-100  bg-opacity-50 ">
        <div className="mx-auto container  md:w-3/4 shadow-md">
          <div className="bg-gray-100 p-4 border-t-2 bg-opacity-5 border-indigo-400 rounded-t">
            <div className="max-w-sm mx-auto md:w-full md:mx-0">
              <div className="flex items-center space-x-4">
                <img
                  className="w-[50px] rounded-full"
                  src="https://api.lorem.space/image/game?w=50&h=50"
                  alt="..."
                />
                <div>
                  <h1 className="text-gray-600">{userDetail.hoTen}</h1>
                </div>
              </div>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white space-y-6"
          >
            <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
              <h2 className="md:w-1/3 max-w-sm mx-auto">Tài khoản</h2>
              <div className="md:w-2/3 max-w-sm mx-auto">
                <label className="text-sm text-gray-400">Email</label>
                <div className="w-full inline-flex border">
                  <div className="pt-2 w-1/12 bg-gray-100 bg-opacity-50">
                    <svg
                      fill="none"
                      className="w-6 text-gray-400 mx-auto"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <input
                    type="email"
                    className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    placeholder="email@example.com"
                    disabled
                    {...register("email")}
                  />
                </div>
              </div>
            </div>
            <hr />
            <div className="md:inline-flex  space-y-4 md:space-y-0  w-full p-4 text-gray-500 items-center">
              <h2 className="md:w-1/3 mx-auto max-w-sm">Thông tin tài khoản</h2>
              <div className="md:w-2/3 mx-auto max-w-sm space-y-5">
                <div>
                  <label className="text-sm text-gray-400">Họ tên</label>
                  <div className="w-full inline-flex border">
                    <div className="w-1/12 pt-2 bg-gray-100">
                      <svg
                        fill="none"
                        className="w-6 text-gray-400 mx-auto"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                      placeholder="Họ tên"
                      {...register("hoTen")}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Số điện thoại</label>
                  <div className="w-full inline-flex border">
                    <div className="pt-2 w-1/12 bg-gray-100">
                      <svg
                        fill="none"
                        className="w-6 text-gray-400 mx-auto"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                      placeholder="Số điện thoại"
                      {...register("soDT")}
                    />
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="md:inline-flex w-full space-y-4 md:space-y-0 p-8 text-gray-500 items-center">
              <h2 className="md:w-4/12 max-w-sm mx-auto">Đổi mật khẩu</h2>
              <div className="md:w-5/12 w-full md:pl-9 max-w-sm mx-auto space-y-5 md:inline-flex pl-2">
                <div className="w-full inline-flex border-b">
                  <div className="w-1/12 pt-2">
                    <svg
                      fill="none"
                      className="w-6 text-gray-400 mx-auto"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <input
                    type="password"
                    className="w-11/12 focus:outline-none focus:text-gray-600 p-2 ml-4"
                    placeholder="New"
                    {...register("matKhau")}
                  />
                </div>
              </div>
              <div className="md:w-3/12 text-center md:pl-6">
                <button className="text-white w-full mx-auto max-w-sm rounded-md text-center bg-indigo-400 py-2 px-4 inline-flex items-center focus:outline-none md:float-right">
                  <svg
                    fill="none"
                    className="w-4 text-white mr-2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Cập nhật
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Info;
