import { useSelector } from "react-redux";

export const useQuanLyNguoiDung = () =>
  useSelector((state) => state.quanLyNguoiDungReducer);
