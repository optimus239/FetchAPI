import { useSelector } from "react-redux";

export const useQuanLyRap = () =>
  useSelector((state) => state.quanLyRapReducer);
