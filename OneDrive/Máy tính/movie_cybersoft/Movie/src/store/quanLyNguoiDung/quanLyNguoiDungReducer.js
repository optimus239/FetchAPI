import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

let user = null;
if (localStorage.getItem("USER_LOGIN")) {
  user = JSON.parse(localStorage.getItem("USER_LOGIN"));
}

const initialState = {
  userLogin: user,
  userList: [],
  isFetching: false,
  error: undefined,
  userDetail: [],
  customer: undefined,
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
      localStorage.removeItem("USER_LOGIN");
      localStorage.removeItem("TOKEN");
      state.userLogin = null;
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
        localStorage.setItem(
          "TOKEN",
          action.payload.accessToken
          // JSON.stringify(action.payload.accessToken)
        );
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
      })

      // danhSachNguoiDung
      .addCase(danhSachNguoiDung.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(danhSachNguoiDung.fulfilled, (state, action) => {
        state.isFetching = false;
        state.userList = action.payload;
      })
      .addCase(danhSachNguoiDung.rejected, (state, action) => {
        state.error = action.payload;
        state.isFetching = false;
      })

      // xoaNguoiDung
      .addCase(xoaNguoiDung.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(xoaNguoiDung.fulfilled, (state, action) => {
        state.isFetching = false;
        Swal.fire("Thành Công!", "Bạn đã xóa thành công!", "success");
      })
      .addCase(xoaNguoiDung.rejected, (state, action) => {
        state.error = action.payload;
        state.isFetching = false;
        Swal.fire({
          icon: "error",
          title: "Thất bại...",
          text: action.payload.content,
          footer: '<a href="">Xin cảm ơn</a>',
        });
      })

      // themNguoiDung
      .addCase(themNguoiDung.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(themNguoiDung.fulfilled, (state, action) => {
        state.isFetching = false;
        console.log(action.payload);
        Swal.fire(
          "Thành Công!",
          "Bạn đã thêm người dùng mới thành công!",
          "success"
        );
      })
      .addCase(themNguoiDung.rejected, (state, action) => {
        state.error = action.payload;
        state.isFetching = false;
        Swal.fire({
          icon: "error",
          title: "Thất bại...",
          text: action.payload.content,
          footer: '<a href="">Xin cảm ơn</a>',
        });
      })

      // layThongTinNguoiDung
      .addCase(layThongTinNguoiDung.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(layThongTinNguoiDung.fulfilled, (state, action) => {
        state.isFetching = false;
        state.userDetail = action.payload;
      })
      .addCase(layThongTinNguoiDung.rejected, (state, action) => {
        state.error = action.payload;
        state.isFetching = false;
      })

      // capNhatThongTinNguoiDung
      .addCase(capNhatThongTinNguoiDung.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(capNhatThongTinNguoiDung.fulfilled, (state, action) => {
        state.isFetching = false;
        Swal.fire("Thành Công!", "Bạn đã cập nhật thành công!", "success");
      })
      .addCase(capNhatThongTinNguoiDung.rejected, (state, action) => {
        state.error = action.payload;
        state.isFetching = false;
        Swal.fire({
          icon: "error",
          title: "Thất bại...",
          text: action.payload.content,
          footer: '<a href="">Xin cảm ơn</a>',
        });
      })

      // capNhatThongTinNguoiDungTaiKhoan
      .addCase(capNhatThongTinNguoiDungTaiKhoan.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(capNhatThongTinNguoiDungTaiKhoan.fulfilled, (state, action) => {
        state.isFetching = false;
        Swal.fire("Thành Công!", "Bạn đã cập nhật thành công!", "success");
        state.userDetail = action.payload;
        state.userLogin = action.payload;
        localStorage.setItem("USER_LOGIN", JSON.stringify(action.payload));
      })
      .addCase(capNhatThongTinNguoiDungTaiKhoan.rejected, (state, action) => {
        state.error = action.payload;
        state.isFetching = false;
        Swal.fire({
          icon: "error",
          title: "Thất bại...",
          text: action.payload.content,
          footer: '<a href="">Xin cảm ơn</a>',
        });
      })

      //infor
      .addCase(inforCustomer.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(inforCustomer.fulfilled, (state, action) => {
        state.isFetching = false;
        state.customer = action.payload;
        console.log("actioncustomer ", action.payload);
      })
      .addCase(inforCustomer.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
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

export const danhSachNguoiDung = createAsyncThunk(
  "quanLyNguoiDung/danhSachNguoiDung",
  async (data, { dispatch, getState, rejectWithValue }) => {
    try {
      const result = await axios({
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP13",
        method: "GET",
        headers: {
          TokenCyberSoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMkUiLCJIZXRIYW5TdHJpbmciOiIxMS8wMy8yMDIzIiwiSGV0SGFuVGltZSI6IjE2Nzg0OTI4MDAwMDAiLCJuYmYiOjE2NTA0NzQwMDAsImV4cCI6MTY3ODY0MDQwMH0.nNcGn0C4SvUfrKPkxYBi5rhhLNuGbmfuND5eXehhzPQ",
        },
      });
      console.log("cong cong");
      return result.data.content;
    } catch (error) {
      console.log("error: ", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const xoaNguoiDung = createAsyncThunk(
  "quanLyNguoiDung/xoaNguoiDung",
  async (taiKhoan, { dispatch, getState, rejectWithValue }) => {
    try {
      const result = await axios({
        url: `https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("TOKEN"),
          TokenCyberSoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMkUiLCJIZXRIYW5TdHJpbmciOiIxMS8wMy8yMDIzIiwiSGV0SGFuVGltZSI6IjE2Nzg0OTI4MDAwMDAiLCJuYmYiOjE2NTA0NzQwMDAsImV4cCI6MTY3ODY0MDQwMH0.nNcGn0C4SvUfrKPkxYBi5rhhLNuGbmfuND5eXehhzPQ",
        },
      });
      dispatch(danhSachNguoiDung());
      return result.data.content;
    } catch (error) {
      console.log("error: ", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const themNguoiDung = createAsyncThunk(
  "quanLyNguoiDung/themNguoiDung",
  async (data, { dispatch, getState, rejectWithValue }) => {
    try {
      const result = await axios({
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung",
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("TOKEN"),
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

export const layThongTinNguoiDung = createAsyncThunk(
  "quanLyNguoiDung/layThongTinNguoiDung",
  async (taiKhoan, { dispatch, getState, rejectWithValue }) => {
    try {
      const result = await axios({
        url: `https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayThongTinNguoiDung?TaiKhoan=${taiKhoan}`,
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("TOKEN"),
          TokenCyberSoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMkUiLCJIZXRIYW5TdHJpbmciOiIxMS8wMy8yMDIzIiwiSGV0SGFuVGltZSI6IjE2Nzg0OTI4MDAwMDAiLCJuYmYiOjE2NTA0NzQwMDAsImV4cCI6MTY3ODY0MDQwMH0.nNcGn0C4SvUfrKPkxYBi5rhhLNuGbmfuND5eXehhzPQ",
        },
      });
      return result.data.content;
    } catch (error) {
      console.log("error: ", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const capNhatThongTinNguoiDung = createAsyncThunk(
  "quanLyNguoiDung/capNhatThongTinNguoiDung",
  async (data, { dispatch, getState, rejectWithValue }) => {
    try {
      const result = await axios({
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("TOKEN"),
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

export const capNhatThongTinNguoiDungTaiKhoan = createAsyncThunk(
  "quanLyNguoiDung/capNhatThongTinNguoiDungTaiKhoan",
  async (data, { dispatch, getState, rejectWithValue }) => {
    try {
      const result = await axios({
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("TOKEN"),
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

export const inforCustomer = createAsyncThunk(
  "quanLyNguoiDung/inforCustomer",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axios({
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan",
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("TOKEN"),
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

export const { logOut } = quanLyNguoiDungActions;
