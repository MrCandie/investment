import React, { Fragment, useState } from "react";
import { updateDeposit } from "../../../util/auth";
import Notification from "../../UI/notification/Notification";
import Spinner from "../../UI/spinner/Spinner";

export default function UpdateDeposit({ setShow, deposit }) {
  if (!deposit) {
    return <Spinner />;
  }

  const [amount, setAmount] = useState(deposit.amount);
  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(false);

  const [modal, setModal] = useState(false);

  const [message, setMessage] = useState({
    title: "",
    text: "",
    status: "",
  });

  async function approveHandler(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const data = {
      status,
      amount,
    };

    try {
      setLoading(true);
      const response = await updateDeposit(deposit.id, token, data);
      setMessage({
        title: "success",
        text: "successful",
        status: "success",
      });
      setModal(true);
      setTimeout(() => setShow(false), 3000);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
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
      <div className="overlay" />
      <div className="popup bg-white">
        <h1 className="plan">approve transaction</h1>
        <hr className="hr" />
        <form onSubmit={approveHandler} className="flex flex-col space-y-4">
          <div className="input-container">
            <label className="label-white-bg text-orange-700">
              deposit amount
            </label>
            <input
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              className="input-custom bg-orange-300"
              type="number"
            />
          </div>
          <div className="input-container">
            <label className="label-white-bg text-orange-700">
              transaction status
            </label>
            <select
              onChange={(e) => setStatus(e.target.value)}
              className="p-4 border rounded-lg outline-none bg-orange-300"
            >
              <option value="">select status</option>
              <option value="pending">Pending</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          <div className="action mt-8">
            <button
              onClick={() => setShow(false)}
              type="button"
              className="button"
            >
              cancel
            </button>
            <button disabled={loading} className="button">
              {loading ? "loading..." : "submit"}
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
