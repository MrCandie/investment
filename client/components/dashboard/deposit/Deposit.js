import React, { useEffect, useState } from "react";
import Basic from "./Basic";
import Golden from "./Golden";
import Silver from "./Silver";
import Starter from "./Starter";

export default function Deposit() {
  const [plan, setPlan] = useState("starter");

  let screen;

  if (plan === "starter") {
    screen = <Starter />;
  } else if (plan === "basic") {
    screen = <Basic />;
  } else if (plan === "silver") {
    screen = <Silver />;
  } else if (plan === "golden") {
    screen = <Golden />;
  }

  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-orange-200">
      <div className="w-[90%] h-[700px] md:w-[60%] lg:w-[40%] p-4 bg-orange-500 rounded-xl">
        <h1 className="capitalize text-xl text-white font-bold text-start">
          make a deposit
        </h1>
        <div className="w-full p-4 flex flex-col space-y-4">
          <label className="label">select a plan</label>
          <select onChange={(e) => setPlan(e.target.value)} className="select">
            <option className="capitalize" value="starter">
              Starter
            </option>
            <option className="capitalize" value="basic">
              basic
            </option>
            <option className="capitalize" value="silver">
              silver
            </option>
            <option className="capitalize" value="golden">
              golden
            </option>
          </select>
        </div>
        {screen}
      </div>
    </div>
  );
}
