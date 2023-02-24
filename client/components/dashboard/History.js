import { useRouter } from "next/router";
import React, { Fragment } from "react";
import Spinner from "../UI/spinner/Spinner";

export default function History({ deposits }) {
  const router = useRouter();

  return (
    <div className="w-full overflow-scroll flex flex-col space-y-2">
      <h1 className="text text-white">transaction history</h1>
      <hr className="hr" />
      {deposits?.length > 0 ? (
        <Fragment>
          {deposits.map((item) => (
            <div
              key={item._id}
              onClick={() => router.push(`/dashboard/history/${item._id}`)}
              className="flex bg-orange-200 p-4 hover:translate-y-[2px]  transition-all duration-300 hover:opacity-80 rounded-md cursor-pointer flex-col space-y-2"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-black text-base lg:text-xl font-semibold uppercase text-start">
                  {item.plan}
                </h2>
                <h4
                  className={item.type === "deposit" ? "deposit" : "withdraw"}
                >
                  {item.type === "deposit" ? "" : "-"} ${item.amount}
                </h4>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-start text-black text-xs lg:text-sm">
                  {item.transactionID}
                </p>
                <p className="confirm-p">{item.status.toUpperCase()}</p>
              </div>
            </div>
          ))}
        </Fragment>
      ) : (
        <div className="flex items-center justify-center p-10">
          <h1 className="h2">no transaction found!</h1>
        </div>
      )}
    </div>
  );
}
