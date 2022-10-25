import React from "react";
import styled from "styled-components";
import "./Footer.css";

const Footer = () => {
  return (
    <Background className="container flex text-center items-center">
      <div className="w-1/3 text-stone-50 text-left ml-12">
        <div>CYBERSOFT MOVIE</div>
        <div>Giới thiệu</div>
        <div>Tiện ích online</div>
        <div>Tuyển dụng</div>
        <div>Liên hệ quảng cáo</div>
      </div>
      <div className="w-1/3">
        <div className="text-stone-50 text-left ml-12">ĐIỀU KHOẢN SỬ DỤNG</div>
        <div className="text-stone-50 text-left ml-12">
          Điều khoản giao dịch
        </div>
        <div className="text-stone-50 text-left ml-12">
          Chính sách thanh toán
        </div>
        <div className="text-stone-50 text-left ml-12">Chính sách bảo mật</div>
        <div className="text-stone-50 text-left ml-12">Câu hỏi thường gặp</div>
      </div>
      <div className="w-1/3">
        <div className="flex">
          <p className="text-rose-700 font-extrabold text-3xl mr-3">
            CYBERSOFT
          </p>
          <div className="footer-movie h-[38px]">
            <p className="text-neutral-400 font-extrabold text-3xl ml-3 mb-0">
              MOVIE
            </p>
          </div>
        </div>
        <p className="text-left text-zinc-500">
          © CYBERSOFT ALL RIGHTS RESERVED
        </p>
      </div>
    </Background>
  );
};

export default Footer;

const Background = styled.div`
  background-color: #2e3136;
  width: 100%;
  height: 300px;
`;
