import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";

import Notification from "../UI/notification/Notification";

export default function DeleteDeposit({ setShow, data, deleteFn, path }) {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);

  const [message, setMessage] = useState({
    title: "",
    text: "",
    status: "",
  });

  const router = useRouter();

  async function deleteHandler() {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const response = await deleteFn(data._id, token);
      setLoading(false);
      setMessage({
        title: "success",
        text: "Delete successful",
        status: "success",
      });
      setModal(true);
      setTimeout(() => {
        setShow(false);
        router.replace(path);
      }, 3000);
    } catch (error) {
      setLoading(false);
      setMessage({
        title: "error",
        text: error.response.data.message || "something went wrong",
        status: "error",
      });
      setModal(true);
    }
  }

  return (
    <Fragment>
      <div className="overlay"></div>
      <div className="bg-white popup">
        <h1 className="text text-red-600">Are you sure?</h1>
        <hr className="hr" />
        <div className="action">
          <button onClick={() => setShow(false)} className="button">
            cancel
          </button>
          <button disabled={loading} onClick={deleteHandler} className="button">
            {loading ? "loading..." : "delete deposit"}
          </button>
        </div>
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
