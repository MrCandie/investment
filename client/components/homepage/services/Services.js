import React from "react";
import ServiceList from "./ServiceList";

export default function Services() {
  return (
    <div className="w-full md:p-8 p-4 lg:p-10">
      <div className="my-10 flex flex-col space-y-4">
        <h1 className="plan text-center">Our services</h1>
        <hr className="hr" />
      </div>
      <ServiceList />
    </div>
  );
}
