import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

let user = null;
if (localStorage.getItem("USER_LOGIN")) {
  user = JSON.parse(localStorage.getItem("USER_LOGIN"));
}

const initialState = {
  userLogin: user,

  isFetching: false,
  error: undefined,
};
export const {
  reducer: quanLyNguoiDungReducer,
  actions: quanLyNguoiDungActions,
} = createSlice({
  name: "quanLyNguoiDung",
  initialState,
  // Xử lý những action đồng bộ
  reducers: {
    logOut: (state) => {
      console.log("ê con dê");
      localStorage.removeItem("USER_LOGIN");
      state.userLogin = {};
      window.location.reload(false);
    },
  },
  // Xử lý những action bất đồng bộ (call API)
  extraReducers: (builder) => {
    builder
      // login
      .addCase(login.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isFetching = false;
        console.log(action.payload);
        localStorage.setItem("USER_LOGIN", JSON.stringify(action.payload));
        state.userLogin = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        console.log("def");
        state.isFetching = false;
        Swal.fire({
          icon: "error",
          title: "Thất bại...",
          text: action.payload.content,
          footer: '<a href="">Xin cảm ơn</a>',
        });
      })

      // sign up
      .addCase(signUp.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isFetching = false;
        console.log(action.payload);
        Swal.fire("Thành Công!", "Bạn đã đăng ký thành công!", "success");
        localStorage.setItem("USER_LOGIN", JSON.stringify(action.payload));
        state.userLogin = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.error = action.payload;

        state.isFetching = false;
        Swal.fire({
          icon: "error",
          title: "Thất bại...",
          text: action.payload.content,
          footer: '<a href="">Xin cảm ơn</a>',
        });
      });
  },
});

export const login = createAsyncThunk(
  "quanLyNguoiDung/login",
  async (data, { dispatch, getState, rejectWithValue }) => {
    try {
      const result = await axios({
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
        method: "POST",
        headers: {
          TokenCyberSoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMkUiLCJIZXRIYW5TdHJpbmciOiIxMS8wMy8yMDIzIiwiSGV0SGFuVGltZSI6IjE2Nzg0OTI4MDAwMDAiLCJuYmYiOjE2NTA0NzQwMDAsImV4cCI6MTY3ODY0MDQwMH0.nNcGn0C4SvUfrKPkxYBi5rhhLNuGbmfuND5eXehhzPQ",
        },
        data,
      });
      console.log("thành cong");
      return result.data.content;
    } catch (error) {
      console.log("error: ", error.response.data);

      return rejectWithValue(error.response.data);
    }
  }
);

export const signUp = createAsyncThunk(
  "quanLyNguoiDung/signUp",
  async (data, { dispatch, getState, rejectWithValue }) => {
    try {
      const result = await axios({
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy",
        method: "POST",
        headers: {
          TokenCyberSoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMkUiLCJIZXRIYW5TdHJpbmciOiIxMS8wMy8yMDIzIiwiSGV0SGFuVGltZSI6IjE2Nzg0OTI4MDAwMDAiLCJuYmYiOjE2NTA0NzQwMDAsImV4cCI6MTY3ODY0MDQwMH0.nNcGn0C4SvUfrKPkxYBi5rhhLNuGbmfuND5eXehhzPQ",
        },
        data,
      });
      console.log("cong cong");
      return result.data.content;
    } catch (error) {
      console.log("error: ", error.response.data);

      return rejectWithValue(error.response.data);
    }
  }
);

export const { logOut } = quanLyNguoiDungActions;
