import React, { useRef, useState, useEffect } from "react";
import { Button, Input, Space, Table } from "antd";
import {
  getMovieList,
  useQuanLyPhim,
  xoaPhim,
} from "../../../store/quanLyPhim";
import { useDispatch } from "react-redux";
import {
  SearchOutlined,
  DeleteOutlined,
  EditOutlined,
  FundProjectionScreenOutlined,
} from "@ant-design/icons";
import { removeVietnameseTones } from "../../../ultis/convertAlphabetToAlphanumeric";
import { NavLink } from "react-router-dom";
import Highlighter from "react-highlight-words";
import Swal from "sweetalert2";

const Films = () => {
  const { movieList } = useQuanLyPhim();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovieList());
  }, []);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Mã Phim",
      dataIndex: "maPhim",
      width: 130,
      key: "maPhim",
      ...getColumnSearchProps("maPhim"),
      // specify the condition of filtering result
      // here is that finding the name started with `value`

      sorter: (a, b) => a.maPhim - b.maPhim,
      defaultSortOrder: "descend",
      sortDirections: ["ascend", "descend", "ascend"],
    },
    {
      title: "Hình Ảnh",
      width: 100,
      dataIndex: "hinhAnh",
      render: (text, record, index) => {
        return <img width={30} src={text} alt="tenPhim" />;
      },
    },
    {
      title: "Tên Phim",
      dataIndex: "tenPhim",
      width: 200,
      key: "tenPhim",
      ...getColumnSearchProps("tenPhim"),
      // onFilter: (value, record) => record.tenPhim.indexOf(value) === 0,
      sorter: (a, b) => {
        let tenPhimA = removeVietnameseTones(a.tenPhim.toLowerCase());
        let tenPhimB = removeVietnameseTones(b.tenPhim.toLowerCase());
        if (tenPhimA > tenPhimB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["ascend", "descend", "ascend"],
    },
    {
      title: "Mô Tả",
      dataIndex: "moTa",
      render: (text, record, index) => {
        return text.length > 50 ? text.substr(0, 50) + "..." : text;
      },
    },
    {
      title: "Hành động",
      dataIndex: "maPhim",
      render: (text, record, index) => {
        return (
          <div>
            <NavLink
              to={`edit/${record.maPhim}`}
              className="text-xl text-green-400 hover:text-red-400 mr-2"
            >
              <EditOutlined />
            </NavLink>
            <span
              style={{ cursor: "pointer" }}
              className="text-xl text-gray-400 hover:text-red-400 mr-2"
              onClick={() => {
                Swal.fire({
                  title: "Bạn có muốn xóa phim?",
                  text: "Bạn sẽ không thể khôi phục lại phim đã xóa!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Xóa phim!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    dispatch(xoaPhim(record.maPhim));
                  }
                });
              }}
            >
              <DeleteOutlined />
            </span>
            <NavLink
              to={`showtime/${record.maPhim}`}
              className="text-xl text-blue-400 hover:text-red-400"
              onClick={() => {
                localStorage.setItem("filmparams", JSON.stringify(record));
              }}
            >
              <FundProjectionScreenOutlined />
            </NavLink>
          </div>
        );
      },
    },
  ];
  const data = movieList;

  return (
    <div>
      <h3>Quản Lý Phim</h3>
      <NavLink to={"/admin/films/addfilm"}>
        <Button type="primary" className="mb-2 hover:text-blue-500">
          Thêm mới phim
        </Button>
      </NavLink>
      <Table rowKey="maPhim" columns={columns} dataSource={data} />
    </div>
  );
};

export default Films;
