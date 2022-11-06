import React, { useState, useEffect } from "react";
import "./AdminLayout.css";

import { PieChartOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Dropdown, Menu, Space } from "antd";

// import React, { useState } from "react";

import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { logOut, useQuanLyNguoiDung } from "../../store/quanLyNguoiDung";
import { useDispatch } from "react-redux";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem(
    <NavLink to="/home">
      <img
        src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png"
        alt="..."
      />
    </NavLink>,
    "1"
  ),
  getItem("Users", "2", <PieChartOutlined />, [
    getItem(<NavLink to="/admin/user">User List</NavLink>, "21"),
    getItem(<NavLink to="/admin/user/addedituser">Add User</NavLink>, "22"),
  ]),

  getItem("Film Manager", "3", <VideoCameraOutlined />, [
    getItem(<NavLink to="/admin/films">Films</NavLink>, "31"),
    getItem(<NavLink to="/admin/films/addfilm">Add Film</NavLink>, "32"),
  ]),
];

const AdminLayout = () => {
  const { userLogin } = useQuanLyNguoiDung();

  const navigate = useNavigate();

  useEffect(() => {
    if (!userLogin) {
      console.log("gì dọ");
      navigate("/home");
    }
  }, [userLogin]);
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const dangXuat = () => {
    dispatch(logOut());
  };
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
    },
  ];
  const menu = <Menu items={item} />;
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          // defaultSelectedKeys={["3"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          <div className="container text-right px-4 mx-auto flex flex-wrap items-center justify-end uppercase font-bold">
            <div className="items-center text-blue-400 flex-shrink-0 hidden lg:flex">
              <span className="mr-2">Xin Chào</span>
              <Dropdown
                overlay={menu}
                placement="bottomLeft"
                arrow
                className="flex items-center"
              >
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
            <button className="p-4 lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 dark:text-gray-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            {/* <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Dev by BC32E Nhóm 1: Huỳnh Quang Cường - Lê Nguyễn Thế Khoa
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
