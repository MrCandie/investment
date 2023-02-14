import React, { Fragment, useState } from "react";
import Link from "next/link";

import { AiOutlineMenu } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";

export default function MobileHeader({ setShow }) {
  return (
    <Fragment>
      <div onClick={() => setShow(false)} className="overlay"></div>
      <nav className="absolute left-0 top-0 z-50 h-[100vh] w-[80%] md:w-1/2 bg-orange-300 shadow-lg flex flex-col">
        <ul className="flex mt-10 flex-col p-4">
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
        <Link
          href="/account/register"
          className="py-4 px-4 hover:opacity-80 absolute left-10 top-80 transition-all duration-300 bg-orange-700 rounded-lg shadow-lg hover:shadow-xl  text-white font-semibold "
        >
          Get Started
        </Link>
      </nav>
    </Fragment>
  );
}
