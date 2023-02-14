import React, { Fragment, useState } from "react";
import Link from "next/link";
import MobileHeader from "./MobileHeader";

import { AiOutlineMenu } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";

export default function Header() {
  const [show, setShow] = useState(false);
  return (
    <Fragment>
      <header className="hidden lg:block w-[80%] md:w-1/2 h-[100vh]   lg:w-full lg:h-full bg-orange-200">
        <div className="w-full lg:flex-row lg:space-x-6   p-4 lg:flex   bg-opacity-40 lg:bg-opacity-100  items-center justify-center  lg:justify-between shadow-md z-10">
          <div className="absolute top-20 lg:static">
            <h1>LOGO</h1>
          </div>
          <ul className="flex flex-col  lg:flex-row lg:space-x-6 lg:space-y-0 items-center justify-center ">
            <li className="nav-item">
              <Link className="nav-link" href="/">
                home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/about">
                about us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/faq">
                FAQ
              </Link>
            </li>
          </ul>
          <div className=" lg:flex lg:items-center  lg:static  lg:py-2 px-4 hover:opacity-80 transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl  bg-orange-700 text-white font-semibold lg:mr-12 ">
            <Link href="/account/register" className="text-lg">
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <div className="lg:hidden bg-orange-200 p-4">
        <div className="lg:hidden flex items-center justify-between">
          <div className="">
            <h1>LOGO</h1>
          </div>
          <span
            onClick={() => (show ? setShow(false) : setShow(true))}
            className="text-xl cursor-pointer z-50 text-black font-bold"
          >
            {show ? <MdOutlineClose /> : <AiOutlineMenu />}
          </span>
        </div>
      </div>
      {show && <MobileHeader setShow={setShow} />}
    </Fragment>
  );
}
