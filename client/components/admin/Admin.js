import React, { Fragment } from "react";
import Header from "../UI/header/Header";
import AdminMenus from "./AdminMenus";

import { BsArrowLeft } from "react-icons/bs";
import { useRouter } from "next/router";

export default function Admin() {
  const router = useRouter();
  return (
    <Fragment>
      <Header />
      <div className="bg-mobile">
        <div className="mobile h-[700px] bg-orange-600 flex flex-col space-y-6">
          <div className="flex items  justify-between">
            <span
              onClick={() => router.replace("/profile")}
              className="nav-icon"
            >
              <BsArrowLeft />
            </span>
            <h1 className="text text-white">admin dashboard</h1>
          </div>
          <hr className="hr" />
          <AdminMenus />
        </div>
      </div>
    </Fragment>
  );
}
