import React from "react";
import Link from "next/link";

const plan = [
  {
    name: "starter",
    percentage: "20%",
    duration: "48hours",
    min: 100,
    max: 6000,
    recommended: true,
  },
  {
    name: "basic",
    percentage: "25%",
    duration: "72hours",
    min: 7000,
    max: 30000,
    recommended: true,
  },
  {
    name: "silver",
    percentage: "35%",
    duration: "96hours",
    min: 31000,
    max: 100000,
    recommended: true,
  },
  {
    name: "silver",
    percentage: "50%",
    duration: "120hours",
    min: 31000,
    max: "unlimited",
    recommended: true,
  },
];

export default function PlanList() {
  return (
    <div className="w-full p-4 md:p-4 lg:p-10">
      <ul className="w-full flex items-center justify-center flex-wrap">
        {plan.map((item) => (
          <li className="w-full md:w-[40%] md:mr-6 shadow-2xl rounded-xl lg:w-[30%] my-4 flex flex-col">
            <div className="w-full bg-orange-100 rounded-t-lg p-4">
              <h1 className="plan text-center">{item.name}</h1>
            </div>
            <div className="bg-orange-600 p-10 flex flex-col space-y-4 items-center justify-center">
              <h1 className="text-2xl lg:text-3xl text-white font-bold ">
                {item.percentage}
              </h1>
              <p className="h4">duration: {item.duration}</p>
            </div>
            <div className="bg-orange-400 p-4">
              <div className="flex flex-col space-y-4">
                <div className="confirm">
                  <p className="confirm-p">minimum</p>
                  <p className="confirm-p">${item.min}</p>
                </div>
                <hr className="hr" />
                <div className="confirm">
                  <p className="confirm-p">maximum</p>
                  <p className="confirm-p">${item.max}</p>
                </div>
              </div>
              <div className="flex my-4 flex-col items-center space-y-4">
                <p className="h2">fast payout</p>
                <hr className="hr" />
                <p className="h2">24 hours support</p>
              </div>
            </div>
            <div className="action p-6 bg-orange-100">
              <Link href="/dashboard" className="button">
                invest now
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
