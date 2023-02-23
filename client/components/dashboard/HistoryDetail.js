import { useRouter } from "next/router";
import React, { Fragment } from "react";

import Spinner from "../UI/spinner/Spinner";

import { BsArrowLeft } from "react-icons/bs";

export default function HistoryDetail({ data }) {
  if (!data) {
    return <Spinner />;
  }
  const router = useRouter();
  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-orange-100">
      <div className="mobile bg-white">
        <div className="flex items-center justify-between">
          <p
            onClick={() => router.replace("/dashboard")}
            className="text-lg p-2 rounded-full active:bg-orange-200 transition-all duration-300 text-orange-600 font-bold cursor-pointer"
          >
            <BsArrowLeft />
          </p>
          <h1 className="text text-black">{data.type} details</h1>
        </div>
        <hr className="hr" />
        <div className="p-4 flex flex-col items-center space-y-6">
          <h1 className="text-md capitalize font-normal text-black">
            {data.type}({data.asset.toUpperCase()})
          </h1>
          <p className="text-2xl text-black font-normal text-center">
            {data.type === "deposit" ? "" : "-"} ${data.amount}
          </p>
        </div>
        <div className="flex flex-col space-y-6 p-2">
          <div className="confirm">
            <p className="confirm-p">fee</p>
            <p className="confirm-p">$0.00</p>
          </div>
          <hr />

          <div className="confirm">
            <p className="confirm-p">address</p>
            <p className="text-[0.6rem] text-black font-normal text-end lg:text-md md:text-sm capitalize md:w-full lg:w-full w-[80%]">
              {data.address}
            </p>
          </div>
          <hr />

          <div className="confirm">
            <p className="confirm-p">status</p>
            <p className="confirm-p">{data.status}</p>
          </div>
          <hr />
          <div className="confirm">
            <p className="confirm-p">plan</p>
            <p className="confirm-p">{data.plan}</p>
          </div>
          <hr />
          <div className="confirm">
            <p className="confirm-p">time</p>
            <p className="confirm-p">{data.createdAt}</p>
          </div>
          <hr />
          <div className="confirm">
            <p className="confirm-p">transactionID</p>
            <p className="confirm-p">{data.transactionID}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
