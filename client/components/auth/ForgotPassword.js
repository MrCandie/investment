import React, { Fragment, useState } from "react";
import { forgotPassword } from "../../util/auth";

import Notification from "../UI/notification/Notification";

export default function ForgotPassword({ setPasswordModal }) {
  const [email, setEmail] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState({
    title: "",
    text: "",
    status: "",
  });

  async function passwordHandler(e) {
    e.preventDefault();
    const data = {
      email: email.toLowerCase(),
    };

    try {
      setLoading(true);
      const response = await forgotPassword(data);

      setLoading(false);
      setMessage({
        title: "success",
        text: "password reset email sent",
        status: "success",
      });
      setShow(true);
      setTimeout(() => setPasswordModal(false), 1000);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setMessage({
        title: "Error",
        text: err.response.data.message || "request failed... Try again",
        status: "error",
      });
      setShow(true);
      setTimeout(() => setPasswordModal(false), 3000);
    }
  }

  return (
    <Fragment>
      <div className="overlay"></div>
      <div className="popup bg-orange-300">
        <h1 className="text">forgot password</h1>
        <hr className="hr" />
        <form className="flex flex-col space-y-6" onSubmit={passwordHandler}>
          <div className="input-container">
            <label className="label-white-bg text-black">enter email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="johndoe@gmail.com"
              className="input"
            />
          </div>
          <div className="action">
            <button
              type="button"
              onClick={() => setPasswordModal(false)}
              className="button"
            >
              cancel
            </button>
            <button disabled={loading} className="button">
              {loading ? "Loading..." : "change password"}
            </button>
          </div>
        </form>
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
