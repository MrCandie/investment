import React from "react";

import { FaGreaterThan } from "react-icons/fa";

export default function Menu({ setShow, setShow1 }) {
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
        <span className="h4">fhgfjkfhkduykudygkuf</span>
      </div>
      <div className="menu">
        <p className="h2">referral code</p>
        <span className="h4">fhgfjkfhkduykudygkuf</span>
      </div>
      <div className="menu">
        <p className="h2">logout</p>
      </div>
    </div>
  );
}
