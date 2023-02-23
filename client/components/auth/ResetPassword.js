import { useRouter } from "next/router";
import React, { Fragment, useContext, useState } from "react";

import Notification from "../UI/notification/Notification";
import { AppContext } from "../../util/context";
import { resetPassword } from "../../util/auth";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const ctx = useContext(AppContext);

  const { token, email } = router.query;

  const [message, setMessage] = useState({
    title: "",
    text: "",
    status: "",
  });

  async function resetHandler(e) {
    e.preventDefault();
    if (!password || !passwordConfirm) {
      setMessage({
        title: "error",
        text: "please fill out necessary fields",
        status: "error",
      });
      return;
    }

    const data = {
      password: password.trim(),
      passwordConfirm: passwordConfirm.trim(),
    };

    try {
      setLoading(true);
      const response = await resetPassword(data, token);
      ctx.logout();
      localStorage.removeItem("token");
      setLoading(false);

      setMessage({
        title: "success",
        text: "password reset successful",
        status: "success",
      });
      setShow(true);
      setTimeout(() => {}, 2000);
    } catch (err) {
      console.log(err);
      setLoading(false);
      localStorage.removeItem("token");
      setMessage({
        title: "Error",
        text: err?.response?.data?.message || "request failed... Try again",
        status: "error",
      });
      setShow(true);
      router.replace("/");
    }
  }
  return (
    <Fragment>
      <div className="w-full h-[100vh] flex items-center justify-center bg-orange-100">
        <div className="mobile bg-white">
          <h1 className="text">reset password</h1>
          <hr className="hr" />
          <form className="flex flex-col space-y-6" onSubmit={resetHandler}>
            <div className="input-container">
              <label className="label-white-bg text-white">new password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="********"
                className="input-custom bg-[#ccc]"
              />
            </div>{" "}
            <div className="input-container">
              <label className="label-white-bg text-white">
                confirm new password
              </label>
              <input
                onChange={(e) => setPasswordConfirm(e.target.value)}
                value={passwordConfirm}
                type="password"
                placeholder="********"
                className="input-custom bg-[#ccc]"
              />
            </div>
            <div className="action">
              <button disabled={loading} className="button">
                {loading ? "Loading..." : "reset password"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {show && (
        <Notification
          title={message.title}
          text={message.text}
          status={message.status}
          setShow={setShow}
        />
      )}
    </Fragment>
  );
}
