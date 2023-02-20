import React, { useContext } from "react";

import { FaGreaterThan } from "react-icons/fa";
import { AppContext } from "../../util/context";

export default function Menu({ setShow, setShow1, user }) {
  const ctx = useContext(AppContext);
  // console.log(user);
  return (
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
  );
}
