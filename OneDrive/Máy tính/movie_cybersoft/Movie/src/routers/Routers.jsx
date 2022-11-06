import React from "react";
import { useRoutes } from "react-router-dom";
import AdminLayout from "../layouts/adminLayout/AdminLayout";
import Films from "../pages/Admin/Film/Films";
import MainLayout from "../layouts/MainLayout";
import NotFound from "../layouts/NotFound";
import Checkout from "../pages/checkout/Checkout";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import MovieDetail from "../pages/movieDetail/MovieDetail";
import Register from "../pages/register/Register";
import AddFilm from "../pages/Admin/Film/AddFilm";
import EditFilm from "../pages/Admin/Film/EditFilm";
import ShowTime from "../pages/Admin/Film/ShowTime";
import User from "../pages/Admin/User/User";
import AddEditUser from "../pages/Admin/User/AddEditUser";
import UserLayout from "../layouts/userlayout/UserLayout";
import Info from "../pages/User/Info";
import AddEditFilm from "../pages/Admin/Film/AddEditFilm";
import EditTip from "../pages/Admin/Film/EditTip";
import TicketInfor from "../pages/User/TicketInfor";
import MovieList from "../layouts/movieList/MovieList";
import Cinemas from "../layouts/cinemas/Cinemas";

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
          path: "ticketroom/:movieIds",
          element: <Checkout />,
        },
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
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "/admin",
          element: <Films />,
        },
        {
          path: "films",
          element: <Films />,
        },
        {
          path: "films/addfilm",
          element: <AddFilm />,
        },
        {
          path: "films/edit/:id",
          element: <EditFilm />,
        },
        {
          path: "films/addeditfilm",
          element: <AddEditFilm />,
        },
        {
          path: "films/addeditfilm/:id",
          element: <AddEditFilm />,
        },
        {
          path: "films/test/:id",
          element: <EditTip />,
        },
        {
          path: "films/showtime/:id",
          element: <ShowTime />,
        },
        {
          path: "user",
          element: <User />,
        },
        {
          path: "user/addedituser",
          element: <AddEditUser />,
        },
        {
          path: "user/addedituser/:iduser",
          element: <AddEditUser />,
        },
      ],
    },
    {
      path: "/user",
      element: <UserLayout />,
      children: [
        {
          path: "/user",
          element: <Info />,
        },
        {
          path: "info",
          element: <Info />,
        },
        {
          path: "ticketinfor",
          element: <TicketInfor />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return routing;
};

export default Routers;
