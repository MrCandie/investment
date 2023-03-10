import React, { Fragment, useEffect, useState } from "react";
import { createWithdraw } from "../../util/auth";
import SetUp2FA from "../profile/SetUp2FA";

import Notification from "../UI/notification/Notification";

import { tokenValidate } from "../../util/auth";

export default function Withdraw({ setShow, dashboard, balance }) {
  const [asset, setAsset] = useState("");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [plan, setPlan] = useState("");

  const [loading, setLoading] = useState(false);

  const [modal, setModal] = useState(false);

  const [modal1, setModal1] = useState(false);

  const [notification, setNotification] = useState({
    text: "",
    title: "",
    status: "",
  });

  async function withdrawHandler() {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    if (Number(amount) > +balance) {
      alert(`Withdrawal amount can't be more than ${balance}`);
      return;
    }
    const data = {
      asset,
      address,
      amount,
      plan,
      status: "pending",
    };

    try {
      setLoading(true);
      const response = await createWithdraw(id, token, data);
      setNotification({
        title: "Success",
        text: "withdrawal successful",
        status: "success",
      });
      setModal1(true);
      setLoading(false);
      setTimeout(() => setShow(false), 3000);
    } catch (err) {
      setLoading(false);
      console.log(err);
      setNotification({
        title: "error",
        text: err.response.data.message || "Something went wrong",
        status: "error",
      });
      setModal1(true);
      setShow(false);
    }
  }

  return (
    <Fragment>
      <div className="overlay"></div>
      <div className="popup bg-orange-600">
        <h1 className="text text-white">initiate a withdrawal</h1>
        <hr className="hr" />
        <form onSubmit={withdrawHandler} className="flex flex-col space-y-6">
          <div className="input-container">
            <label className="label">enter amount</label>
            <input
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              max={balance}
              type="number"
              placeholder="Enter withdrawal amount"
              className="input"
            />
          </div>
          <div className="input-container">
            <label className="label">select your plan</label>
            <select
              onChange={(e) => setPlan(e.target.value)}
              className="select"
            >
              <option className="capitalize" value="starter">
                Starter
              </option>
              <option className="capitalize" value="basic">
                basic
              </option>
              <option className="capitalize" value="silver">
                silver
              </option>
              <option className="capitalize" value="golden">
                golden
              </option>
            </select>
          </div>
          <div className="input-container">
            <label className="label">select asset to withdraw</label>
            <select
              onChange={(e) => setAsset(e.target.value)}
              className="select"
            >
              <option className="capitalize" value="bitcoin">
                bitcoin
              </option>
              <option className="capitalize" value="ethereum">
                ethereum
              </option>
              <option className="capitalize" value="litecoin">
                litecoin
              </option>
              <option className="capitalize" value="usdt">
                USDT
              </option>
            </select>
          </div>
          <div className="input-container">
            <label className="label">withdrawal address</label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
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
            <button
              type="button"
              onClick={() => setModal(true)}
              disabled={loading}
              className="button"
            >
              {loading ? "Loading..." : "withdraw"}
            </button>
          </div>
        </form>
      </div>
      {modal1 && (
        <Notification
          setShow={setModal1}
          title={notification.title}
          text={notification.text}
          status={notification.status}
        />
      )}
      {modal && (
        <SetUp2FA
          authFn={tokenValidate}
          fn={withdrawHandler}
          setShow={setModal}
        />
      )}
    </Fragment>
  );
}
