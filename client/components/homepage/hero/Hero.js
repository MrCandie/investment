import React, { useContext } from "react";
import Link from "next/link";
import { AppContext } from "../../../util/context";

export default function Hero() {
  const ctx = useContext(AppContext);
  return (
    <div className="w-full flex items-center justify-center relative h-[90vh] bg-cover bg-[url('/images/home.jpg')] ">
      <div className="flex w-[80%] md:w-[60%] lg:w-[40%] flex-col space-y-6 bg-white p-6 lg:p-10 rounded-lg shadow-lg">
        <h1 className="capitalize text-xl font-bold text-center">
          make the right investment decision with us!
        </h1>
        <Link
          href={ctx.isLoggedIn ? "/dashboard" : "/account/register"}
          className="p-4 text-white flex w-[60%] rounded-lg md:w-[40%] lg:w-[40%] mx-auto items-center justify-center text-center font-semibold text-lg bg-orange-700 hover:opacity-80 transition-all duration-300"
        >
          {ctx.isLoggedIn ? "Dashboard" : "Get Started"}
        </Link>
      </div>
    </div>
  );
}
