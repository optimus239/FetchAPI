import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { inforCustomer } from "../quanLyNguoiDung";

const initialState = {
  isFetching: false,
  seatList: [],
  error: undefined,
  checkedList: [],
  tabActive: "1",
};

export const { reducer: quanLyDatVeReducer, actions: quanLyDatVeActions } =
  createSlice({
    name: "quanLyDatVe",
    initialState,
    reducers: {
      getCheckedList: (state, action) => {
        let index = state.checkedList.findIndex(
          (seat) => seat.maGhe === action.payload.maGhe
        );
        if (index !== -1) {
          state.checkedList.splice(index, 1);
        } else {
          state.checkedList.push(action.payload);
        }
      },
      changeKey: (state, action) => {
        state.tabActive = action.payload.number;
      },
      resetTab: (state, action) => {
        state.tabActive = action.payload.number;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getSeatList.pending, (state, action) => {
          state.isFetching = true;
        })
        .addCase(getSeatList.fulfilled, (state, action) => {
          state.isFetching = false;
          state.seatList = action.payload;
        })
        .addCase(getSeatList.rejected, (state, action) => {
          state.isFetching = false;
          state.error = action.payload;
        });
      builder
        .addCase(postCheckOut.pending, (state, action) => {
          state.isFetching = true;
        })
        .addCase(postCheckOut.fulfilled, (state, action) => {
          state.isFetching = false;
          state.checkedList = [];
          state.tabActive = "2";
        })
        .addCase(postCheckOut.rejected, (state, action) => {
          state.isFetching = false;
          state.error = action.payload;
        });
    },
  });

export const getSeatList = createAsyncThunk(
  "quanLyDatVe/getSeatList",
  async (movieId, { rejectWithValue }) => {
    try {
      const result = await axios({
        url: `https://movienew.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${movieId}`,
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

export const postCheckOut = createAsyncThunk(
  "quanLyDatVe/postCheckOut",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const result = await axios({
        url: "https://movienew.cybersoft.edu.vn/api/QuanLyDatVe/DatVe",
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("TOKEN"),
          TokenCyberSoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMkUiLCJIZXRIYW5TdHJpbmciOiIyMC8wMy8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzkyNzA0MDAwMDAiLCJuYmYiOjE2NTA0NzQwMDAsImV4cCI6MTY3OTQxODAwMH0.S7l5kogAVJjRW8mjJ5gosJraYq5ahYjrBwnMJAaGxlY",
        },
        data,
      });
      await dispatch(inforCustomer());
      await dispatch(getSeatList(data.maLichChieu));
      return result.data.content;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const { getCheckedList, changeKey, resetTab } = quanLyDatVeActions;
