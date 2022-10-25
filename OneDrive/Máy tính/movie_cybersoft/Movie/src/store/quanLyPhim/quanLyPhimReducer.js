import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  movieList: [],
  isFetching: false,
  error: undefined,
  carouselList: [],
  cinemaList: [],
  movieDetail: undefined,
};

export const { reducer: quanLyPhimReducer, actions: quanLyPhimActions } =
  createSlice({
    name: "quanLyPhim",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
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
        });
      builder.addCase(getCarouselList.pending, (state, action) => {
        state.isFetching = true;
      });

      builder
        .addCase(getCarouselList.fulfilled, (state, action) => {
          state.isFetching = false;
          state.carouselList = action.payload;
        })
        .addCase(getCarouselList.rejected, (state, action) => {
          state.isFetching = false;
          state.error = action.payload;
        });

      builder.addCase(getCinemaList.pending, (state, action) => {
        state.isFetching = true;
      });
      builder
        .addCase(getCinemaList.fulfilled, (state, action) => {
          state.isFetching = false;
          state.cinemaList = action.payload;
        })
        .addCase(getCinemaList.rejected, (state, action) => {
          state.isFetching = false;
          state.error = action.payload;
        });
      builder.addCase(getMovieDetail.pending, (state, action) => {
        state.isFetching = true;
      });
      builder.addCase(getMovieDetail.fulfilled, (state, action) => {
        state.isFetching = false;
        state.movieDetail = action.payload;
      });
      builder.addCase(getMovieDetail.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
      });
    },
  });

export const getMovieList = createAsyncThunk(
  "quanLyPhim/getMovieList",
  async (data, { dispatch, getState, rejectWithValue }) => {
    try {
      const result = await axios({
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01",
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

export const getCinemaList = createAsyncThunk(
  "quanLyPhim/getCinameList",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axios({
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01",
        method: "GET",
        headers: {
          TokenCyberSoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMkUiLCJIZXRIYW5TdHJpbmciOiIyMC8wMy8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzkyNzA0MDAwMDAiLCJuYmYiOjE2NTA0NzQwMDAsImV4cCI6MTY3OTQxODAwMH0.S7l5kogAVJjRW8mjJ5gosJraYq5ahYjrBwnMJAaGxlY",
        },
      });
      return result.data.content;
    } catch (err) {
      return rejectWithValue(err.response.data);
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
      return result.data.content;
    } catch (err) {
      return rejectWithValue(err.respone.data);
    }
  }
);
