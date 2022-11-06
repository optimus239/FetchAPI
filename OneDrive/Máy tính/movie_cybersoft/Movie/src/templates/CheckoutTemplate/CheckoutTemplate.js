import React from "react";
import { Link } from "react-router-dom";

const CheckoutTemplate = () => {
  if (!localStorage.getItem("USER_LOGIN")) return <Link to="/login"></Link>;
  return <div>CheckoutTemplate</div>;
};

export default CheckoutTemplate;
