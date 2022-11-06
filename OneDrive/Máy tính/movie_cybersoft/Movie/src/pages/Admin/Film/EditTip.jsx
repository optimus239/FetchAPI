import { FileImageOutlined } from "@ant-design/icons";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getMovieDetail,
  updateMovie,
  useQuanLyPhim,
} from "../../../store/quanLyPhim";

const EditTip = () => {
  const { movieDetail } = useQuanLyPhim();
  const [imgUpload, setImgUpload] = useState("");
  const dispatch = useDispatch();
  const params = useParams();

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
    dispatch(getMovieDetail(params.id));
  }, []);
  useEffect(() => {
    reset({
      ...movieDetail,
      ngayKhoiChieu: moment(movieDetail?.ngayKhoiChieu).format("YYYY-MM-DD"),
      hinhAnh: null,
    });
  }, [movieDetail]);

  const handleImg = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = (e) => {
      setImgUpload(e.target.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    data.ngayKhoiChieu = moment(data.ngayKhoiChieu).format("DD-MM-YYYY");
    data.dangChieu = true;

    // Tạo đối tượng formdata
    let formData = new FormData();
    for (let key in data) {
      if (key !== "hinhAnh") {
        formData.append(key, data[key]);
      } else {
        if (data.hinhAnh !== null) {
          formData.append("File", data.hinhAnh[0], data.hinhAnh[0].name);
        }
      }
    }
    dispatch(updateMovie(formData));
  };
  return (
    <div>
      <h3>Cập nhật phim</h3>
      <form className="w-4/5 mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 mb-6 w-full group">
            <label
              htmlFor="tenPhim"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Tên Phim
            </label>
            <input
              type="text"
              id="tenPhim"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Tên Phim"
              {...register("tenPhim", {
                required: "Không được bỏ trống",
              })}
            />
            {errors?.tenPhim?.message && (
              <p className="text-red-400 mt-2">{errors?.tenPhim?.message}</p>
            )}
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <label
              htmlFor="maNhom"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Mã Nhóm
            </label>
            <select
              id="maNhom"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("maNhom")}
            >
              <option>GP00</option>
              <option>GP01</option>
              <option>GP02</option>
              <option>GP03</option>
              <option>GP04</option>
              <option>GP05</option>
              <option>GP06</option>
              <option>GP07</option>
              <option>GP08</option>
              <option>GP09</option>
              <option>GP10</option>
              <option>GP11</option>
              <option>GP12</option>
              <option defaultValue>GP13</option>
            </select>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 mb-6 w-full group">
            <label
              htmlFor="trailer"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Trailer:
            </label>
            <input
              type="text"
              id="trailer"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Trailer"
              {...register("trailer", {
                required: "Không được bỏ trống",
              })}
            />
            {errors?.trailer?.message && (
              <p className="text-red-400 mt-2">{errors?.trailer?.message}</p>
            )}
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <label
              htmlFor="danhGia"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Đánh Giá
            </label>
            <input
              type="number"
              id="danhGia"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Đánh Giá"
              min={1}
              max={10}
              {...register("danhGia", {
                min: {
                  value: 1,
                  message: "Không ít hơn 1 điểm",
                },
                max: {
                  value: 10,
                  message: "Không quá 10 điểm",
                },
                required: "Không được bỏ trống",
              })}
            />
            {errors?.danhGia?.message && (
              <p className="text-red-400 mt-2">{errors?.danhGia?.message}</p>
            )}
          </div>
        </div>
        <div className="relative z-0 mb-6 w-full group">
          <div className="relative z-0 mb-6 w-full group">
            <label
              htmlFor="trailer"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Mô Tả:
            </label>
            <input
              type="text"
              id="moTa"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Mô tả"
              {...register("moTa", {
                required: "Không được bỏ trống",
              })}
            />
            {errors?.moTa?.message && (
              <p className="text-red-400 mt-2">{errors?.moTa?.message}</p>
            )}
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              htmlFor="user_avatar"
            >
              Hình Ảnh
            </label>
            <input
              className=" w-[60%] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 p-2"
              aria-describedby="user_avatar_help"
              id="hinhAnh"
              type="file"
              accept="image/jpeg, image/png"
              {...register("hinhAnh")}
              onChange={handleImg}
            />

            <img
              width={100}
              src={imgUpload === "" ? movieDetail?.hinhAnh : imgUpload}
              alt="..."
            />
            {errors?.hinhAnh?.message && (
              <p className="text-red-400 mt-2">{errors?.hinhAnh?.message}</p>
            )}
          </div>

          <div className="relative z-0 mb-6 w-full group">
            <div className="mb-6">
              <label
                htmlFor="ngayKhoiChieu"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Ngày Khởi Chiếu
              </label>
              <input
                type="date"
                id="tenPhim"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                {...register("ngayKhoiChieu", {
                  required: "Không được bỏ trống",
                })}
              />
              {errors?.ngayKhoiChieu?.message && (
                <p className="text-red-400 mt-2">
                  {errors?.ngayKhoiChieu?.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 mb-6 w-full group">
            <div>
              <label
                htmlFor="toggle"
                className="text-sm font-medium text-gray-900 dark:text-gray-300 mr-12"
              >
                Sắp Chiếu:
              </label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input
                  type="checkbox"
                  name="sapChieu"
                  id="sapChieu"
                  className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-2 appearance-none cursor-pointer"
                  {...register("sapChieu")}
                />
                <label
                  htmlFor="sapChieu"
                  className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="relative z-0 mb-6 w-full group">
            <div>
              <label
                htmlFor="toggle"
                className="text-sm font-medium text-gray-900 dark:text-gray-300 mr-12"
              >
                Hot:
              </label>
              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input
                  type="checkbox"
                  name="hot"
                  id="hot"
                  className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-2 appearance-none cursor-pointer"
                  {...register("hot")}
                />
                <label
                  htmlFor="hot"
                  className="toggle-label block overflow-hidden h-5 rounded-full bg-gray-300 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditTip;
