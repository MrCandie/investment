import React, { Fragment, useContext, useState } from "react";
import { updatePassword } from "../../util/auth";
import { AppContext } from "../../util/context";
import Notification from "../UI/notification/Notification";

export default function ChangePassword({ setShow }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    title: "",
    text: "",
    status: "",
  });

  const ctx = useContext(AppContext);
  const token = localStorage.getItem("token");

  async function passwordChangeHandler(e) {
    e.preventDefault();
    const data = {
      currentPassword,
      password,
      passwordConfirm,
    };
    if (!currentPassword || !password || !passwordConfirm) {
      setMessage({
        title: "Error",
        text: "password fields cannot be empty",
        status: "error",
      });
      setModal(true);
      return;
    }
    try {
      setLoading(true);
      const response = await updatePassword(ctx.user.id, data, token);

      setMessage({
        title: "success",
        text: "password changed successfully",
        status: "success",
      });
      setLoading(false);
      setModal(true);
      setTimeout(() => setShow(false), 3000);
      ctx.logout();
    } catch (err) {
      console.log(err);
      setLoading(false);
      setMessage({
        title: "Error",
        text: err.response.data.message || "request failed... Try again",
        status: "error",
      });
      setModal(true);
      setTimeout(() => setShow(false), 3000);
    }
  }

  return (
    <Fragment>
      <div className="overlay"></div>
      <div className="popup bg-orange-300">
        <h1 className="text">update password</h1>
        <hr className="hr" />
        <form
          onSubmit={passwordChangeHandler}
          className="flex flex-col space-y-6"
        >
          <div className="input-container">
            <label className="label-white-bg text-black">
              current password
            </label>
            <input
              onChange={(e) => setCurrentPassword(e.target.value)}
              value={currentPassword}
              type="password"
              placeholder="********"
              className="input"
            />
          </div>
          <div className="input-container">
            <label className="label-white-bg text-black">new password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="********"
              className="input"
            />
          </div>
          <div className="input-container">
            <label className="label-white-bg text-black">
              confirm new password
            </label>
            <input
              onChange={(e) => setPasswordConfirm(e.target.value)}
              value={passwordConfirm}
              type="password"
              placeholder="********"
              className="input"
            />
          </div>
          <div className="action">
            <button
              type="button"
              onClick={() => setShow(false)}
              className="button"
            >
              cancel
            </button>
            <button disabled={loading} className="button">
              {loading ? "Loading..." : "update"}
            </button>
          </div>
        </form>
      </div>
      {modal && (
        <Notification
          title={message.title}
          text={message.text}
          status={message.status}
          setShow={setModal}
        />
      )}
    </Fragment>
  );
}
