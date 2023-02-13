import React, { Fragment } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { Pagination, Autoplay, Navigation, Scrollbar } from "swiper";

const images = [
  "/images/house5.jpg",
  "/images/house6.jpg",
  "/images/house1.jpg",
  "/images/house2.jpg",
  "/images/house4.jpg",
];

export default function House() {
  return (
    <Fragment>
      <Swiper
        pagination={true}
        spaceBetween={30}
        slidesPerView="1"
        modules={[Pagination, Autoplay]}
        autoplay={true}
        className=""
      >
        <ul className="flex items-center justify-between w-full">
          {images.map((item, i) => (
            <SwiperSlide>
              <li className="w-full" key={i}>
                <img src={item} className="w-full h-[100vh] object-cover" />
              </li>
            </SwiperSlide>
          ))}
        </ul>
      </Swiper>
    </Fragment>
  );
}
