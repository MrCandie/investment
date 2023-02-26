import React, { Fragment, useState } from "react";
import { updateDeposit } from "../../util/auth";
import Spinner from "../UI/spinner/Spinner";

export default function UpdateDeposit({ setShow, deposit }) {
  if (!deposit) {
    return <Spinner />;
  }

  const [amount, setAmount] = useState(deposit.amount);
  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(false);

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
      alert("Successful");
      setShow(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error.response.data.message || "something went wrong");
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
    </Fragment>
  );
}
