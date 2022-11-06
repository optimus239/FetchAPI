import React, { useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logOut, useQuanLyNguoiDung } from "../store/quanLyNguoiDung";
import { Dropdown, Menu, Space } from "antd";

const Header = () => {
  const { userLogin } = useQuanLyNguoiDung();
  console.log("userLogin: ", userLogin);
  const dispatch = useDispatch();
  const dangXuat = () => {
    dispatch(logOut());
  };
  const [navbarOpen, setNavbarOpen] = useState(false);

  // Menudropdown

  const item = [
    {
      label: (
        <Link rel="noopener noreferrer" to="/user">
          Tài Khoản
        </Link>
      ),
      key: "0",
    },
    userLogin?.maLoaiNguoiDung === "QuanTri"
      ? {
          label: (
            <Link rel="noopener noreferrer" to="/admin">
              Quản trị
            </Link>
          ),
          key: "1",
        }
      : undefined,
    {
      type: "divider",
    },
    {
      label: <span onClick={dangXuat}>Đăng xuất</span>,
      key: "3",
      // disabled: true,
    },
  ];
  const menu = <Menu items={item} />;

  console.log("navbarOpen: ", navbarOpen);

  const titleRef = useRef();
  console.log("navbarOpen: ", navbarOpen);
  const navigate = useNavigate();
  return (
    <>
      <Navbar
        className="flex flex-wrap items-center justify-between px-2 py-3 z-10 w-full container"
        style={{ backgroundColor: "rgb(33, 33, 33)" }}
      >
        <div className="container px-4 flex flex-wrap items-center justify-between">
          <NavLink
            className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start"
            to="/home"
          >
            <a
              className="uppercase text-red-700 font-bold text-2xl items-center"
              href="#pablo"
            >
              Cybersoft
            </a>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </NavLink>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none justify-between mb-0">
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#pablo"
                >
                  <i className="text-lg text-white opacity-75"></i>
                  <NavLink className="ml-2 text-white" to="/home">
                    Trang chủ
                  </NavLink>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#pablo"
                >
                  <i className="text-lg text-white opacity-75"></i>
                  <span className="ml-2">Phim</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#pablo"
                >
                  <i className="text-lg text-white opacity-75"></i>
                  <span className="ml-2">Rạp</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="flex">
            {userLogin ? (
              <div className="px-3 flex items-center text-xs uppercase font-bold  text-white ">
                <span className="mr-2">Xin Chào</span>
                <Dropdown overlay={menu} placement="bottomLeft" arrow>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      <span className="flex items-center">
                        <img
                          className="w-full rounded-full"
                          src="https://api.lorem.space/image/game?w=50&h=50"
                          alt="..."
                        />
                      </span>

                      {userLogin?.hoTen}
                    </Space>
                  </a>
                </Dropdown>
              </div>
            ) : (
              <>
                <button
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Đăng ký
                </button>
                <button
                  className="ml-3 px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Đăng nhập
                </button>
              </>
            )}
          </div>
        </div>
      </Navbar>
    </>
  );
};

export default Header;

const Navbar = styled.div`
  background-color: rgba(112, 110, 110, 0.2);
`;
