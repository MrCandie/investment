import React, { Fragment, useState } from "react";
import { verifyRequest } from "../../util/auth";
import Spinner from "../UI/spinner/Spinner";

export default function User({ user }) {
  const [loading, setLoading] = useState(false);

  async function sendVerificationRequest() {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const response = await verifyRequest(token);
      setLoading(false);
      alert(response.message);
    } catch (err) {
      console.log(err);
      alert("something went wrong");
    }
  }

  return (
    <Fragment>
      <div className="mobile bg-orange-500 flex space-x-6 items-center justify-between">
        <div className="relative lg:w-[150px] h-[100px] w-[100px] lg:h-[150px]">
          <img
            className="w-full rounded-full object-cover h-full"
            src={user.image ? user.image : "/images/unknown.png"}
          />
        </div>
        <div className="flex-1">
          <h1 className="h2">{user.name ? user.name : "unknown"}</h1>
          <div className="flex space-y-2 lg:space-y-0 flex-col lg:flex row">
            <h2 className="text-sm text-[#eee] font-normal lowercase">
              {user.email ? user.email : "unknown"}
            </h2>
            <p
              onClick={sendVerificationRequest}
              className="text-base lg:text-lg text-start text-red-900 cursor-pointer hover:bg-orange-100 p-1 font-medium capitalize;"
            >
              {user.emailIsVerified ? "" : "Verify email"}
            </p>
          </div>
        </div>
      </div>
      {loading && <Spinner />}
    </Fragment>
  );
}
