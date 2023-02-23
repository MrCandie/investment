import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { verifyEmail } from "../../util/auth";
import { AppContext } from "../../util/context";

export default function VerifyEmail() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const ctx = useContext(AppContext);

  const { token, email } = router.query;
  const data = {
    email: email,
    verificationToken: token,
  };

  useEffect(() => {
    async function emailVerify() {
      try {
        const response = await verifyEmail(data);
        setMessage(response.message);
      } catch (err) {
        console.log(err);
      }
    }
    emailVerify();
  }, [token, email]);

  function loginHandler() {
    ctx.logout();

    router.replace("/account/login");
  }

  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-orange-100">
      <div className="bg-white w-[90%] lg:w-[40%] p-8 rounded-lg shadow-xl flex flex-col space-y-10">
        <h1 className="text">{message}</h1>
        <div className="action">
          <button onClick={loginHandler} className="button">
            proceed to login
          </button>
        </div>
      </div>
    </div>
  );
}
