import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { AiFillHome } from "react-icons/ai";
import { AiFillSetting } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

export default function Navigation() {
  const router = useRouter();
  let navStyle = "navBottom";
  return (
    <div className="w-full md:[60%] mx-auto flex items-center justify-between lg:w-[40%] bg-orange-400 fixed md:bottom-0 bottom-0 px-3 left-0 lg:left-[30%] md:left-0">
      <Link href="/" className="navBottom">
        <span className="nav-icon">
          <AiFillHome />
        </span>
      </Link>
      <Link href="/dashboard" className={navStyle}>
        <span className="nav-icon">
          <MdDashboard />
        </span>
      </Link>
      <Link href="/profile" className={navStyle}>
        <span className="nav-icon">
          <FaUserCircle />
        </span>
      </Link>
      <Link href="/setting" className={navStyle}>
        <span className="nav-icon">
          <AiFillSetting />
        </span>
      </Link>
    </div>
  );
}
