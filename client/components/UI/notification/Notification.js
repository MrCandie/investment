import React, { Fragment } from "react";

import { BiErrorCircle } from "react-icons/bi";
import { BsFillCheckCircleFill } from "react-icons/bs";

export default function Notification({ title, text, status, setShow }) {
  return (
    <Fragment>
      <div className="overlay"></div>
      <div className="bg-white z-20 flex flex-col space-y-6 rounded-lg shadow-xl p-10 w-[90%] lg:w-[40%] md:w-[60%] absolute top-60 lg:top-20 left-5 md:left-[20%] lg:left-[30%]">
        <h1 className={status === "error" ? "error" : "success"}>{title}</h1>
        <hr className="hr" />
        {status === "error" ? (
          <span className="flex items-center justify-center text-2xl text-red-600">
            <BiErrorCircle />
          </span>
        ) : (
          <span className="flex items-center justify-center text-2xl text-green-600">
            <BsFillCheckCircleFill />
          </span>
        )}
        <p className={status === "error" ? "error-text" : "success-text"}>
          {text}
        </p>
        <div className="action">
          <button onClick={() => setShow(false)} className="button">
            ok
          </button>
        </div>
      </div>
    </Fragment>
  );
}
