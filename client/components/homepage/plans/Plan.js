import React from "react";
import PlanList from "./PlanList";

export default function Plan() {
  return (
    <div className="w-full md:p-8 p-4 lg:p-10">
      <div className="my-10 flex flex-col space-y-4">
        <h1 className="plan text-center">investment plans & offers</h1>
        <hr className="hr" />
      </div>
      <PlanList />
    </div>
  );
}
