import React from "react";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";
import { Pagination } from "swiper";

import { MdCallReceived } from "react-icons/md";
import { TbSend } from "react-icons/tb";
import Spinner from "../UI/spinner/Spinner";

export default function Balance({
  setShow,
  dashboard,
  balance,
  allWithdraw,
  totalDeposit,
}) {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView="1.1"
      modules={[Pagination]}
      className="flex h-[250px] w-full"
    >
      <SwiperSlide>
        <div className="balance-container">
          <h1 className="text-white capitalize text-base lg:text-lg font-medium text-center">
            Balance
          </h1>
          <p className="text-lg lg:text-2xl text-white font-semi-bold text-center">
            ${balance}
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
          <p className="text-lg lg:text-2xl text-white font-semi-bold text-center">
            ${totalDeposit}
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="balance-container">
          <h1 className="text-white capitalize text-lg font-medium text-center">
            Total withdrawals
          </h1>
          <p className="text-lg lg:text-2xl text-white font-semi-bold text-center">
            ${allWithdraw}
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="balance-container">
          <h1 className="text-white capitalize text-lg font-medium text-center">
            profits
          </h1>
          <p className="text-lg lg:text-2xl text-white font-semi-bold text-center">
            ${dashboard.profit ? dashboard.profit : 0}
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="balance-container">
          <h1 className="text-white capitalize text-lg font-medium text-center">
            referral bonus
          </h1>
          <p className="text-lg lg:text-2xl text-white font-semi-bold text-center">
            ${dashboard.referralBonus ? dashboard.balance : 0}
          </p>
          <div className="flex items-center justify-around w-full">
            <span className="action-btn">
              <TbSend />
            </span>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
