import React from "react";
import Spinner from "../UI/spinner/Spinner";

import { AiFillEdit } from "react-icons/ai";

export default function User({ user }) {
  return (
    <div className="mobile bg-orange-500 flex space-x-6 items-center justify-between">
      <div className="relative lg:w-[150px] h-[100px] w-[100px] lg:h-[150px]">
        <img
          className="w-full rounded-full object-cover h-full"
          src={user.image ? user.image : "/images/unknown.png"}
        />
      </div>
      <div className="flex-1">
        <h1 className="h2">{user.name ? user.name : "unknown"}</h1>
        <h2 className="h4">{user.email ? user.email : "unknown"}</h2>
      </div>
    </div>
  );
}
