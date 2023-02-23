import React from "react";
import { verifyRequest } from "../../util/auth";
import Spinner from "../UI/spinner/Spinner";

export default function User({ user }) {
  async function sendVerificationRequest() {
    const token = localStorage.getItem("token");
    try {
      const response = await verifyRequest(token);
      alert(response.message);
    } catch (err) {
      console.log(err);
      alert("something went wrong");
    }
  }

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
        <div className="flex items-center justify-between">
          <h2 className="h4 lowercase">
            {user.email ? user.email : "unknown"}
          </h2>
          <p onClick={sendVerificationRequest} className="h2 cursor-pointer">
            {user.emailIsVerified ? "" : "Verify email"}
          </p>
        </div>
      </div>
    </div>
  );
}
