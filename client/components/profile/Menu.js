import React, { Fragment, useContext, useState } from "react";
import Link from "next/link";

import { FaGreaterThan } from "react-icons/fa";
import { AppContext } from "../../util/context";
import { authenticate } from "../../util/auth";
import ShowSecret from "./ShowSecret";
import SetUp2FA from "./SetUp2FA";

export default function Menu({ setShow, setShow1, user }) {
  const ctx = useContext(AppContext);

  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);

  async function authController() {
    const token = localStorage.getItem("token");

    try {
      const response = await authenticate(token);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Fragment>
      <div className="mobile bg-orange-400 mt-4 flex flex-col">
        <div onClick={() => setShow(true)} className="menu">
          <p className="h2">edit profile</p>
          <span className="icon">
            <FaGreaterThan />
          </span>
        </div>
        <div onClick={() => setShow1(true)} className="menu">
          <p className="h2">change password</p>
          <span className="icon">
            <FaGreaterThan />
          </span>
        </div>
        <div onClick={() => setModal(true)} className="menu">
          <p className="h2">set-up 2FA</p>
          <span className="icon">
            <FaGreaterThan />
          </span>
        </div>
        {user.role === "admin" && (
          <Link href="/admin" className="menu">
            <p className="h2">admin dashboard</p>
            <span className="icon">
              <FaGreaterThan />
            </span>
          </Link>
        )}
        <div className="menu">
          <p className="h2">profile ID</p>
          <span className="h4">
            {user.profileId ? user.profileId : "unknown"}
          </span>
        </div>
        <div className="menu">
          <p className="h2">referral code</p>
          <span className="h4">
            {user.referralCode ? user.referralCode : "unknown"}
          </span>
        </div>
        <div onClick={() => ctx.logout()} className="menu">
          <p className="h2">logout</p>
        </div>
      </div>
      {modal && (
        <ShowSecret user={user} setShow1={setModal1} setShow={setModal} />
      )}
      {modal1 && <SetUp2FA authFn={authenticate} setShow={setModal1} />}
    </Fragment>
  );
}
