import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { redirect } from "react-router-dom";
import Swal from "sweetalert2";

const initialState = {
  movieList: [],
  isFetching: false,
  error: undefined,
  carouselList: [],
  movieDetail: undefined,
};

export const { reducer: quanLyPhimReducer, actions: quanLyPhimActions } =
  createSlice({
    name: "quanLyPhim",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        // getMovieList
        .addCase(getMovieList.pending, (state, action) => {
          state.isFetching = true;
        })
        .addCase(getMovieList.fulfilled, (state, action) => {
          state.movieList = action.payload;
          state.isFetching = false;
        })
        .addCase(getMovieList.rejected, (state, action) => {
          state.isFetching = false;
          state.error = action.payload;
        })

        // getCarouselList
        .addCase(getCarouselList.pending, (state, action) => {
          state.isFetching = true;
        })
        .addCase(getCarouselList.fulfilled, (state, action) => {
          state.isFetching = false;
          state.carouselList = action.payload;
        })
        .addCase(getCarouselList.rejected, (state, action) => {
          state.isFetching = false;
          state.error = action.payload;
        })

        // getMovieDetail
        .addCase(getMovieDetail.pending, (state, action) => {
          state.isFetching = true;
        })
        .addCase(getMovieDetail.fulfilled, (state, action) => {
          state.isFetching = false;
          state.movieDetail = action.payload;
        })
        .addCase(getMovieDetail.rejected, (state, action) => {
          state.isFetching = false;
          state.error = action.payload;
        })

        // Thêm phim upload hình
        .addCase(themPhimUploadHinh.pending, (state, action) => {
          state.isFetching = true;
        })
        .addCase(themPhimUploadHinh.fulfilled, (state, action) => {
          state.isFetching = false;
          console.log(action.payload);
          Swal.fire("Thành Công!", "Bạn đã thêm phim thành công!", "success");
          localStorage.setItem("filmparams", JSON.stringify(action.payload));
          redirect("/admin/films");
        })
        .addCase(themPhimUploadHinh.rejected, (state, action) => {
          state.error = action.payload;
          state.isFetching = false;
          Swal.fire({
            icon: "error",
            title: "Thất bại...",
            text: action.payload.content,
            footer: '<a href="">Xin cảm ơn</a>',
          });
        })

        // Xóa phim
        .addCase(xoaPhim.pending, (state, action) => {
          state.isFetching = true;
        })
        .addCase(xoaPhim.fulfilled, (state, action) => {
          state.isFetching = false;
          console.log(action.payload);
          Swal.fire("Thành Công!", "Bạn đã xóa phim thành công!", "success");
        })
        .addCase(xoaPhim.rejected, (state, action) => {
          state.error = action.payload;
          state.isFetching = false;
          Swal.fire({
            icon: "error",
            title: "Thất bại...",
            text: action.payload.content,
            footer: '<a href="">Xin cảm ơn</a>',
          });
        })

        // Cập nhật phim Upload
        .addCase(updateMovie.pending, (state, action) => {
          state.isFetching = true;
        })
        .addCase(updateMovie.fulfilled, (state, action) => {
          state.isFetching = false;
          console.log(action.payload);
          Swal.fire(
            "Thành Công!",
            "Bạn đã cập nhật phim thành công!",
            "success"
          );
        })
        .addCase(updateMovie.rejected, (state, action) => {
          state.error = action.payload;
          console.log(action.payload);
          state.isFetching = false;
          Swal.fire({
            icon: "error",
            title: "Thất bại...",
            text: action.payload,
            footer: '<a href="">Xin cảm ơn</a>',
          });
        });
    },
  });

export const getMovieList = createAsyncThunk(
  "quanLyPhim/getMovieList",
  async (data, { dispatch, getState, rejectWithValue }) => {
    try {
      const result = await axios({
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP13",
        method: "GET",
        headers: {
          TokenCyberSoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMkUiLCJIZXRIYW5TdHJpbmciOiIyMC8wMy8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzkyNzA0MDAwMDAiLCJuYmYiOjE2NTA0NzQwMDAsImV4cCI6MTY3OTQxODAwMH0.S7l5kogAVJjRW8mjJ5gosJraYq5ahYjrBwnMJAaGxlY",
        },
      });
      return result.data.content;
    } catch (err) {
      return rejectWithValue(err.respone.data);
    }
  }
);

export const getCarouselList = createAsyncThunk(
  "quanLyPhim/getCarouselList",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axios({
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachBanner",
        method: "GET",
        headers: {
          TokenCyberSoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMkUiLCJIZXRIYW5TdHJpbmciOiIyMC8wMy8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzkyNzA0MDAwMDAiLCJuYmYiOjE2NTA0NzQwMDAsImV4cCI6MTY3OTQxODAwMH0.S7l5kogAVJjRW8mjJ5gosJraYq5ahYjrBwnMJAaGxlY",
        },
      });
      return result.data.content;
    } catch (err) {
      return rejectWithValue(err.respone.data);
    }
  }
);

export const getMovieDetail = createAsyncThunk(
  "quanLyPhim/getMovieDetail",
  async (movieId, { rejectWithValue }) => {
    try {
      const result = await axios({
        url: `https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`,
        method: "GET",
        headers: {
          TokenCyberSoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMkUiLCJIZXRIYW5TdHJpbmciOiIyMC8wMy8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzkyNzA0MDAwMDAiLCJuYmYiOjE2NTA0NzQwMDAsImV4cCI6MTY3OTQxODAwMH0.S7l5kogAVJjRW8mjJ5gosJraYq5ahYjrBwnMJAaGxlY",
        },
      });
      console.log(result.data.content);
      return result.data.content;
    } catch (err) {
      return rejectWithValue(err.respone.data);
    }
  }
);

export const themPhimUploadHinh = createAsyncThunk(
  "quanLyPhim/themPhimUploadHinh",
  async (data, { dispatch, getState, rejectWithValue }) => {
    try {
      const result = await axios({
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh",
        method: "POST",
        headers: {
          TokenCyberSoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMkUiLCJIZXRIYW5TdHJpbmciOiIyMC8wMy8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzkyNzA0MDAwMDAiLCJuYmYiOjE2NTA0NzQwMDAsImV4cCI6MTY3OTQxODAwMH0.S7l5kogAVJjRW8mjJ5gosJraYq5ahYjrBwnMJAaGxlY",
        },
        data,
      });
      return result.data.content;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const xoaPhim = createAsyncThunk(
  "quanLyPhim/xoaPhim",
  async (maPhim, { dispatch, getState, rejectWithValue }) => {
    try {
      const result = await axios({
        url: `https://movienew.cybersoft.edu.vn/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("TOKEN"),
          TokenCyberSoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMkUiLCJIZXRIYW5TdHJpbmciOiIyMC8wMy8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzkyNzA0MDAwMDAiLCJuYmYiOjE2NTA0NzQwMDAsImV4cCI6MTY3OTQxODAwMH0.S7l5kogAVJjRW8mjJ5gosJraYq5ahYjrBwnMJAaGxlY",
        },
      });
      dispatch(getMovieList());
      return result.data.content;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateMovie = createAsyncThunk(
  "quanLyPhim/updateMovie",
  async (data, { dispatch, getState, rejectWithValue }) => {
    try {
      const result = await axios({
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhimUpload",
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("TOKEN"),
          TokenCyberSoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMkUiLCJIZXRIYW5TdHJpbmciOiIyMC8wMy8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzkyNzA0MDAwMDAiLCJuYmYiOjE2NTA0NzQwMDAsImV4cCI6MTY3OTQxODAwMH0.S7l5kogAVJjRW8mjJ5gosJraYq5ahYjrBwnMJAaGxlY",
        },
        data,
      });
      return result.data.content;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
