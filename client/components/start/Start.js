import Link from "next/link";
import React from "react";

export default function Start({ setScreen }) {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center md:p-4 bg-orange-100">
      <div className="w-[90%] md:w-[60%] lg:w-[40%] p-6 flex flex-col space-y-20 bg-orange-700 shadow-xl rounded-lg h-[700px]">
        <div className="w-[200px] mx-auto my-6">
          <img src="/images/invest.svg" className="w-full" />
        </div>
        <div className="flex flex-col space-y-4">
          <h1 className="text-white text-xl text-center font-bold capitalize">
            invest in secure and real life assets
          </h1>
          <p className="text-white mb-30 text-lg font-normal text-center capitalize">
            create a passive income for yourself!
          </p>
        </div>
        <button
          onClick={() => setScreen("wallet")}
          className="p-4 bg-orange-500 text-center w-[60%] mx-auto capitalize flex items-center justify-center text-white font-semibold text-xl rounded-lg hover:shadow-xl shadow-lg transition-all duration-300"
        >
          get started
        </button>
      </div>
    </div>
  );
}
