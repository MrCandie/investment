import React from "react";

export default function User() {
  return (
    <div className="mobile bg-orange-500 flex space-x-6 items-center justify-between">
      <div className="lg:w-[150px] h-[100px] w-[100px] lg:h-[150px]">
        <img
          className="w-full rounded-full object-cover h-full"
          src="/images/unknown.png"
        />
      </div>
      <div className="flex-1">
        <h1 className="h2">john doe</h1>
        <h2 className="h4">johndoe@gmail.com</h2>
      </div>
    </div>
  );
}
