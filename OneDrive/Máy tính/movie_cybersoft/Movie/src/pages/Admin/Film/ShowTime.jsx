import React, { useEffect, useState } from "react";
import { Button, Select, DatePicker, Form, InputNumber } from "antd";
import axios from "axios";
import moment from "moment";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const ShowTime = () => {
  const params = useParams();

  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: [],
  });

  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      try {
        let result = await axios({
          url: "https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap",
          method: "GET",
          headers: {
            TokenCyberSoft:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMkUiLCJIZXRIYW5TdHJpbmciOiIxMS8wMy8yMDIzIiwiSGV0SGFuVGltZSI6IjE2Nzg0OTI4MDAwMDAiLCJuYmYiOjE2NTA0NzQwMDAsImV4cCI6MTY3ODY0MDQwMH0.nNcGn0C4SvUfrKPkxYBi5rhhLNuGbmfuND5eXehhzPQ",
          },
        });
        setState({
          ...state,
          heThongRapChieu: result.data.content,
        });
      } catch (error) {
        console.log("error: ", error.response.data);
      }
    };

    // call the function
    fetchData();
  }, []);

  let film = JSON.parse(localStorage.getItem("filmparams"));

  // Select
  const { Option } = Select;

  const handleHeThongRapChieu = (value, item) => {
    const fetchData = async () => {
      try {
        let result = await axios({
          url: `https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${value}`,
          method: "GET",
          headers: {
            TokenCyberSoft:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMkUiLCJIZXRIYW5TdHJpbmciOiIxMS8wMy8yMDIzIiwiSGV0SGFuVGltZSI6IjE2Nzg0OTI4MDAwMDAiLCJuYmYiOjE2NTA0NzQwMDAsImV4cCI6MTY3ODY0MDQwMH0.nNcGn0C4SvUfrKPkxYBi5rhhLNuGbmfuND5eXehhzPQ",
          },
        });
        setState({
          ...state,
          cumRapChieu: result.data.content,
        });
      } catch (error) {
        console.log("error: ", error.response.data);
      }
    };

    // call the function
    fetchData();
  };
  const handleCumRapChieu = (value) => {};

  // Datepicker
  const onChangeDate = (value, dateString) => {};
  const onOk = (value) => {};

  // InputNumber
  const onChangeNumber = (value) => {};

  // Form
  const onFinish = (values) => {
    values.ngayChieuGioChieu = moment(values.ngayChieuGioChieu).format(
      "DD-MM-YYYY hh:mm:ss"
    );
    values.maPhim = params.id;

    const fetchData = async () => {
      try {
        await axios({
          url: "https://movienew.cybersoft.edu.vn/api/QuanLyDatVe/TaoLichChieu",
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("TOKEN"),
            TokenCyberSoft:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMkUiLCJIZXRIYW5TdHJpbmciOiIxMS8wMy8yMDIzIiwiSGV0SGFuVGltZSI6IjE2Nzg0OTI4MDAwMDAiLCJuYmYiOjE2NTA0NzQwMDAsImV4cCI6MTY3ODY0MDQwMH0.nNcGn0C4SvUfrKPkxYBi5rhhLNuGbmfuND5eXehhzPQ",
          },
          data: values,
        });
        Swal.fire(
          "Thành Công!",
          "Bạn đã thêm lịch chiếu thành công!",
          "success"
        );
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Thất bại...",
          text: error.response.data,
          footer: '<a href="">Xin cảm ơn</a>',
        });
      }
    };

    // call the function
    fetchData();
  };
  const onFinishFailed = (errorInfo) => {};
  return (
    <div className="flex ">
      <div className="w-2/5">
        <h2>Tạo lịch chiếu - {film.tenPhim}</h2>
        <img src={film.hinhAnh} alt="..." width={150} />
      </div>
      <Form
        name="basic"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        //   initialValues={{ maPhim: params.id }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        //   onValuesChange={onValuesChange}
        autoComplete="off"
      >
        <Form.Item label="Hệ thống rạp">
          <Select
            //   defaultValue={state.heThongRapChieu[0]?.tenHeThongRap}
            style={{
              width: 210,
            }}
            placeholder="Chọn hệ thống rạp"
            onChange={handleHeThongRapChieu}
          >
            {state.heThongRapChieu.map((item, index) => (
              <Option key={index} value={item.maHeThongRap}>
                {item.tenHeThongRap}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Cụm rạp"
          name="maRap"
          rules={[{ required: true, message: "Vui lòng chọn cụm rạp!" }]}
        >
          <Select
            style={{
              width: 210,
            }}
            placeholder="Chọn cụm rạp"
            onChange={handleCumRapChieu}
          >
            {state.cumRapChieu.map((item, index) => (
              <Option key={index} value={item.maCumRap}>
                {item.tenCumRap}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Ngày chiếu giờ chiếu"
          name="ngayChieuGioChieu"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn ngày chiếu và giờ chiếu!",
            },
          ]}
        >
          <DatePicker
            showTime
            label="ngayChieu"
            format="DD/MM/YYYY hh:mm:ss"
            onChange={onChangeDate}
            onOk={onOk}
            placeholder="Chọn ngày giờ chiếu"
          />
        </Form.Item>
        <Form.Item
          label="Giá vé"
          name="giaVe"
          rules={[{ required: true, message: "Vui lòng điền giá vé!" }]}
        >
          <InputNumber
            min={75000}
            max={150000}
            //   defaultValue={75000}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            onChange={onChangeNumber}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Tạo lịch chiếu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ShowTime;
