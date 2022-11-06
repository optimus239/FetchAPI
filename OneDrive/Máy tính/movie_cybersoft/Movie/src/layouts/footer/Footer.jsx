import React from "react";
import styled from "styled-components";
import "./Footer.css";

const Footer = () => {
  return (
    <Background className="container flex text-center items-center max-w-full footer-movie">
      <div className="footer-text w-3/12 text-stone-50 text-left ml-12">
        <div className="text-stone-50 text-center ml-12 font-bold text-movie-left">
          CYBERSOFT MOVIE
        </div>
        <div className="text-stone-50 text-center ml-12">Giới thiệu</div>
        <div className="text-stone-50 text-center ml-12">Tiện ích online</div>
        <div className="text-stone-50 text-center ml-12">Tuyển dụng</div>
        <div className="text-stone-50 text-center ml-12">Liên hệ quảng cáo</div>
      </div>
      <div className="w-3/12 footer-rules text-stone-50 text-center ml-12">
        <div className="text-stone-50 text-center ml-12 font-bold text-movie-mid">
          ĐIỀU KHOẢN SỬ DỤNG
        </div>
        <div className="text-stone-50 text-center ml-12">
          Điều khoản giao dịch
        </div>
        <div className="text-stone-50 text-center ml-12">
          Chính sách thanh toán
        </div>
        <div className="text-stone-50 text-center ml-12">
          Chính sách bảo mật
        </div>
        <div className="text-stone-50 text-center ml-12">
          Câu hỏi thường gặp
        </div>
      </div>
      <div className="w-6/12 footer-name">
        <div className="flex justify-center text-movie-right">
          <p className="text-rose-700 font-extrabold text-3xl mr-3 text-cybersoft">
            CYBERSOFT
          </p>
          <div className="footer-text-movie h-[38px]">
            <p className="text-neutral-400 font-extrabold text-3xl ml-3 mb-0 text-cybersoft-movie">
              MOVIE
            </p>
          </div>
        </div>
        <p className="text-center text-zinc-500">
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
