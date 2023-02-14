import React from "react";
import Link from "next/link";

import { AiOutlineMail } from "react-icons/ai";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiOutlineCopyrightCircle } from "react-icons/ai";

export default function Footer() {
  return (
    <div className="w-full bg-orange-200 p-4 pb-10 md:p-6 lg:p-10">
      <div className="flex flex-col space-y-6  w-full">
        <h1 className="capitalize text-xl lg:text-4xl text-orange-800 font-bold text-center">
          got any questions?
        </h1>
        <p className="footer-text">
          please don't hesitate to contact us as we would be quick to respond to
          you
        </p>
        <div className="action">
          <a href="" className="button">
            contact us
          </a>
        </div>
      </div>
      <div className="my-10 flex flex-col space-y-6 md:flex-row md:items-center md:space-y-0  md:justify-between lg:space-y-0 lg:flex-row">
        <div className="footer-head">
          <h1 className="plan text-start lg:text-center">investment.com</h1>
          <div className="w-[100px] h-[100px]">
            <img className="w-full" />
          </div>
          <p>
            Our mission is to provide every person the opportunity to gain
            maximal profit from investing at minimal risk.
          </p>
        </div>
        <div className="footer-head">
          <h1 className="plan text-start lg:text-center my-4">useful links</h1>

          <div className="flex flex-col space-y-4">
            <Link className="footer-link" href="/about">
              about
            </Link>
            <hr className="hr" />
            <Link className="footer-link" href="/faq">
              FAQ
            </Link>
            <hr className="hr" />
            <Link href="/account/register" className="footer-link">
              get started
            </Link>
            <hr className="hr" />
          </div>
        </div>
        <div className="footer-head">
          <h1 className="plan text-start lg:text-center my-4">contact us</h1>
          <div className="flex flex-col space-y-4">
            <Link className="footer-link" href="">
              <AiOutlineMail />
            </Link>
            <hr className="hr" />
            <Link className="footer-link" href="">
              <AiOutlineWhatsApp />
            </Link>
            <hr className="hr" />
            <Link href="" className="footer-link">
              <AiFillTwitterCircle />
            </Link>
            <hr className="hr" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <p className="text-base flex items-center text-black font-normal capitalize">
          <AiOutlineCopyrightCircle /> 2023 investment.com - ALL RIGHTS RESERVED
        </p>
      </div>
    </div>
  );
}
