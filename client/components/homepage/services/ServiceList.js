import React, { Fragment } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import "swiper/css/navigation";

import { Pagination } from "swiper";

const services = [
  {
    title: "crypto trading",
    description: "Invest in the world's most popular investment option",
    image: "/images/crypto.jpg",
  },
  {
    title: "forex and indices",
    description: "high volatility with high profit",
    image: "/images/crypto1.jpg",
  },
  {
    title: "stock market",
    description: "medium term investment option",
    image: "/images/crypto3.jpg",
  },
  {
    title: "real estates",
    description: "great option for long term investment",
    image: "/images/house6.jpg",
  },
  {
    title: "gold",
    description: "invest in valuable resources with great returns",
    image: "/images/gold.jpeg",
  },
];

export default function ServiceList() {
  return (
    <Fragment>
      <div className="hidden lg:block w-[80%] mx-auto">
        <Swiper
          pagination={true}
          spaceBetween={30}
          slidesPerView="3"
          modules={[Pagination]}
          className=""
        >
          <ul className="flex items-center justify-between w-full">
            {services.map((item, i) => (
              <SwiperSlide key={i} className="rounded-lg shadow-lg">
                <li className="w-full">
                  <div className="">
                    <img
                      className="w-full rounded-lg h-[400px] relative object-cover"
                      src={item.image}
                    />
                  </div>
                  <div className="absolute p-4 top-0 left-0 w-full bg-[rgba(0,0,0,0.5)] h-[400px] flex items-center justify-center">
                    <div className="flex flex-col space-y-4">
                      <h1 className="text-base lg:text-2xl capitalize text-white font-bold text-center">
                        {item.title}
                      </h1>
                      <p className="text-lg text-center text-white font-medium">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </li>
              </SwiperSlide>
            ))}
          </ul>
        </Swiper>
      </div>

      <div className="lg:hidden w-[100%] mx-auto">
        <Swiper
          pagination={true}
          spaceBetween={30}
          slidesPerView="1.2"
          modules={[Pagination]}
          className=""
        >
          <ul className="flex items-center justify-between w-full">
            {services.map((item, i) => (
              <SwiperSlide key={i} className="rounded-lg shadow-lg">
                <li className="w-full">
                  <div className="">
                    <img
                      className="w-full h-[400px] rounded-lg relative object-cover"
                      src={item.image}
                    />
                  </div>
                  <div className="absolute p-4 top-0 left-0 w-full bg-[rgba(0,0,0,0.5)] h-[400px] flex items-center justify-center">
                    <div className="flex flex-col space-y-4">
                      <h1 className="text-base lg:text-2xl capitalize text-white font-bold text-center">
                        {item.title}
                      </h1>
                      <p className="text-lg text-center text-white font-medium">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </li>
              </SwiperSlide>
            ))}
          </ul>
        </Swiper>
      </div>
    </Fragment>
  );
}
