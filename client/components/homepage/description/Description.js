import React from "react";
import Link from "next/link";

import { BsArrowRight } from "react-icons/bs";

export default function Description() {
  return (
    <div className="p-12 bg-white flex flex-col space-y-6">
      <div className="flex items-start w-full lg:w-[80%]">
        <h1 className="text-3xl leading-8 text-black capitalize font-bold">
          Invest in one of the world's largest{" "}
          <span className="text-4xl text-orange-800">
            real estate and gold mining companies
          </span>
        </h1>
      </div>
      <div className="flex flex-col lg:w-1/2 space-y-4">
        <p className="text-lg text-black font-normal text-start ">
          We Safely Deliver Superior Returns To Our Stakeholders From Finding,
          Developing And Operating Gold And Copper Mines.
        </p>
        <Link
          href="/about"
          className="flex items-center underline space-x-4 text-orange-800 font-semibold text-xl capitalize"
        >
          learn more
          <span className="flex items-center ml-2">
            <BsArrowRight />
          </span>
        </Link>
      </div>
    </div>
  );
}
