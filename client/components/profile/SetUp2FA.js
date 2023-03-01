import React, { Fragment, useState } from "react";
import { authenticate } from "../../util/auth";

import Notification from "../UI/notification/Notification";

export default function SetUp2FA({ setShow, authToken, fn, authFn }) {
  const [token, setToken] = useState("");

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  const [notification, setNotification] = useState({
    text: "",
    title: "",
    status: "",
  });

  async function authHandler(e) {
    e.preventDefault();
    const jwt = localStorage.getItem("token");
    const data = { token };
    try {
      setLoading(true);
      const response = await authFn(authToken || jwt, data);
      setNotification({
        title: "Success",
        text: "successful",
        status: "success",
      });
      const fnData = await fn();
      console.log(fnData);
      setModal(true);
      console.log(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setNotification({
        title: "error",
        text: "error setting up 2FA",
        status: "error",
      });
      setModal(true);
      console.log(error);
    }
  }
  return (
    <Fragment>
      <div className="overlay"></div>
      <div className="popup bg-white">
        <h1 className="text text-orange-600">Enter authentication token</h1>
        <hr className="hr" />
        <form onSubmit={authHandler} className="flex flex-col space-y-4">
          <div className="input-container">
            <label className="label-white-bg text-orange-600">
              enter token
            </label>
            <input
              onChange={(e) => setToken(e.target.value)}
              value={token}
              className="input-custom bg-orange-200"
              type="text"
              placeholder="Enter token"
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
              {loading ? "loading..." : "complete"}
            </button>
          </div>
        </form>
      </div>
      {modal && (
        <Notification
          setShow={setModal}
          title={notification.title}
          text={notification.text}
          status={notification.status}
        />
      )}
    </Fragment>
  );
}

SetUp2FA.defaultProps = {
  token: "",
  fn: () => console.log("no function specified"),
};
