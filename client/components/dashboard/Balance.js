import React from "react";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Pagination } from "swiper";

import { MdCallReceived } from "react-icons/md";
import { TbSend } from "react-icons/tb";

export default function Balance({ setShow }) {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView="1.1"
      modules={[Pagination]}
      className="flex h-[250px] w-full"
    >
      <SwiperSlide>
        <div className="balance-container">
          <h1 className="text-white capitalize text-lg font-medium text-center">
            Balance
          </h1>
          <p className="text-2xl text-white font-semi-bold text-center">
            $1,000
          </p>
          <div className="flex items-center justify-around w-full">
            <Link href="/dashboard/deposit" className="action-btn">
              <MdCallReceived />
            </Link>
            <span onClick={() => setShow(true)} className="action-btn">
              <TbSend />
            </span>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="balance-container">
          <h1 className="text-white capitalize text-lg font-medium text-center">
            Total deposits
          </h1>
          <p className="text-2xl text-white font-semi-bold text-center">
            $1,000
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="balance-container">
          <h1 className="text-white capitalize text-lg font-medium text-center">
            Total withdrawals
          </h1>
          <p className="text-2xl text-white font-semi-bold text-center">
            $1,000
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="balance-container">
          <h1 className="text-white capitalize text-lg font-medium text-center">
            profits
          </h1>
          <p className="text-2xl text-white font-semi-bold text-center">
            $1,000
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="balance-container">
          <h1 className="text-white capitalize text-lg font-medium text-center">
            referral bonus
          </h1>
          <p className="text-2xl text-white font-semi-bold text-center">
            $1,000
          </p>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
