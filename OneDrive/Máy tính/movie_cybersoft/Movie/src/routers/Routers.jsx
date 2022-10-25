import React from "react";
import { useRoutes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import MovieDetail from "../pages/movieDetail/MovieDetail";
import Register from "../pages/register/Register";

const Routers = () => {
  const routing = useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "/", element: <Home /> },
        {
          path: "home",
          element: <Home />,
        },
        { path: "detail/:movieIds", element: <MovieDetail /> },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
  ]);
  return routing;
};

export default Routers;
