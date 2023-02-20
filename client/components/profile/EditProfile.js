import React, { Fragment, useContext, useState } from "react";
import { updateUser } from "../../util/auth";
import { AppContext } from "../../util/context";
import Notification from "../UI/notification/Notification";

export default function EditProfile({ setShow }) {
  const [name, setName] = useState("");

  const ctx = useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState({
    title: "",
    text: "",
    status: "",
  });

  async function editProfileHandler(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    const data = {
      name,
    };
    if (!name) {
      setMessage({
        title: "Error",
        text: "please fill necessary fields correctly",
        status: "error",
      });
      setModal(true);
      return;
    }
    try {
      setLoading(true);
      const response = await updateUser(ctx.user.id || id, data, token);
      console.log(response);
      setLoading(false);
      setShow(false);
      alert("profile updated");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setMessage({
        title: "Error",
        text: "request failed... Try again",
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
        <h1 className="text">edit profile</h1>
        <hr className="hr" />
        <form onSubmit={editProfileHandler} className="flex flex-col space-y-6">
          <div className="input-container">
            <label className="label-white-bg text-black">Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="John Doe"
              className="input"
            />
          </div>
          <div className="input-container">
            <label className="label-white-bg text-black">profile picture</label>
            <input type="file" />
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
