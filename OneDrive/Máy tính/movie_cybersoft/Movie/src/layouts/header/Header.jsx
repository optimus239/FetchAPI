import React, { useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logOut, useQuanLyNguoiDung } from "../../store/quanLyNguoiDung";
import { Dropdown, Menu, Space } from "antd";
import "./Header.css";

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
        className="flex flex-wrap items-center justify-between px-2 py-3 z-10 w-full container max-w-full header"
        style={{ backgroundColor: "rgb(33, 33, 33)" }}
      >
        <div className="container px-4 flex flex-wrap items-center justify-between max-w-full">
          <NavLink
            className="w-full navbar-res relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start"
            to="/home"
          >
            <span className="uppercase text-red-700 font-bold text-2xl items-center logo-cybersoft">
              Cybersoft
            </span>
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
                <span className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                  <i className="text-lg text-white opacity-75"></i>
                  <NavLink className="ml-2 text-white" to="/home">
                    Trang chủ
                  </NavLink>
                </span>
              </li>
              <li className="nav-item">
                <span className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                  <i className="text-lg text-white opacity-75"></i>
                  <Link className="ml-2" to={"/news"}>
                    Tin tức
                  </Link>
                </span>
              </li>
              <li className="nav-item">
                <span
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#pablo"
                >
                  <i className="text-lg text-white opacity-75"></i>
                  <Link className="ml-2" to={"/contact"}>
                    Liên hệ
                  </Link>
                </span>
              </li>
            </ul>
          </div>
          <div className="flex">
            {userLogin ? (
              <div className="navbar-user px-3 flex items-center text-xs uppercase font-bold  text-white ">
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
