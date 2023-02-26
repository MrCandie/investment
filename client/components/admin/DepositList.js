import { useRouter } from "next/router";
import React from "react";

export default function DepositList({ deposits }) {
  const router = useRouter();
  return (
    <ul className="list-container">
      {deposits.map((item) => (
        <li
          onClick={() => router.push(`/admin/transactions/deposits/${item.id}`)}
          key={item.id}
          className="list"
        >
          <div className="w-[10%] flex items-center justify-center rounded-full p-2 bg-orange-100">
            <h1 className="text-center font-bold text-black flex items-center ">
              {item.asset?.slice(0, 1).toUpperCase()}
            </h1>
          </div>
          <div className="flex-1">
            <p className="text-base lg:text-lg text-orange-600 font-medium capitalize">
              ${item.amount}
            </p>
            <p className="text-sm  text-orange-600 font-medium capitalize">
              {item.asset}
            </p>
          </div>
          <div className="">
            <h1 className="text-base text-black font-normal uppercase">
              {item.status}
            </h1>
          </div>
        </li>
      ))}
    </ul>
  );
}
