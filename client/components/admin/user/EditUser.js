import React, { Fragment, useState } from "react";
import { updateUserAdmin } from "../../../util/auth";
import Spinner from "../../UI/spinner/Spinner";
import Notification from "../../UI/notification/Notification";

export default function EditUser({ user, setShow }) {
  if (!user) {
    return <Spinner />;
  }

  const [role, setRole] = useState(user.role);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const [message, setMessage] = useState({
    title: "",
    text: "",
    status: "",
  });
  const [modal, setModal] = useState(false);

  const [loading, setLoading] = useState(false);

  async function editHandler(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const data = {
      name,
      email,
      role,
    };
    try {
      setLoading(true);
      const response = await updateUserAdmin(user.id, token, data);
      setMessage({
        title: "success",
        text: "edit successful",
        status: "success",
      });
      setModal(true);
      setLoading(false);
      setTimeout(() => setShow(false), 3000);
    } catch (error) {
      setLoading(false);
      setMessage({
        title: "error",
        text: error.response.data.message || "Something went wrong",
        status: "error",
      });
      setModal(true);
    }
  }

  return (
    <Fragment>
      <div className="overlay"></div>
      <div className="bg-white popup">
        <h1 className="text">edit user</h1>
        <hr className="hr" />
        <form onSubmit={editHandler} className="flex flex-col space-y-4">
          <div className="input-container">
            <label className="label-white-bg text-orange-600">user name</label>
            <input
              className="input-custom bg-orange-400"
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
            />
          </div>
          <div className="input-container">
            <label className="label-white-bg text-orange-600">user email</label>
            <input
              className="input-custom bg-orange-400"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
            />
          </div>
          <div className="input-container">
            <label className="label-white-bg text-orange-600">user role</label>
            <input
              className="input-custom bg-orange-400"
              onChange={(e) => setRole(e.target.value)}
              value={role}
              type="text"
            />
          </div>

          <hr className="hr" />
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
