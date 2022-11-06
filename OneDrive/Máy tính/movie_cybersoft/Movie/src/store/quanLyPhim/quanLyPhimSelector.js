import { useSelector } from "react-redux";

export const useQuanLyPhim = () =>
  useSelector((state) => state.quanLyPhimReducer);
