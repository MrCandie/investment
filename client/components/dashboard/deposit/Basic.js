import React, { Fragment, useEffect, useState } from "react";
import Notification from "../../UI/notification/Notification";

import { createDeposit } from "../../../util/auth";
import Popup from "./Popup";

export default function Basic({
  show,
  setShow,
  modal,
  setModal,
  loading,
  confirmDeposit,
}) {
  const [notification, setNotification] = useState({
    text: "",
    title: "",
    status: "",
  });

  const [address, setAddress] = useState("");

  const [amount, setAmount] = useState("");
  const [asset, setAsset] = useState("");

  useEffect(() => {
    if (asset === "bitcoin") {
      setAddress("n1nRfQvRxDFZ9m8PFeWdsnsDGptHKBSHsk");
    } else if (asset === "ethereum") {
      setAddress("0x097DF0544E7D3C741EF9C01282323D9443E85644");
    } else if (asset === "litecoin") {
      setAddress("mwrJkJQxQT9GCKY3wvw6DqkhLEr9YrVeJi");
    } else if (asset === "USDT") {
      setAddress("0x097DF0544E7D3C741EF9C01282323D9443E85644");
    }
  }, [asset]);

  function openConfirmHandler(e) {
    e.preventDefault();
    if (!amount || !asset) {
      setNotification({
        title: "error",
        text: "please fill in necessary fields",
        status: "error",
      });
      setModal(true);
      return;
    }
    if (Number(amount) < 7000 || Number(amount) > 30000) {
      setNotification({
        title: "error",
        text: "amount for basic plan cannot be less then $7000 or more than $30000",
        status: "error",
      });
      setModal(true);
      return;
    }
    setShow(true);
  }

  async function basicDepositHandler() {
    const data = {
      amount,
      asset,
      address,
      plan: "basic",
      status: "pending",
    };
    return await confirmDeposit(data);
  }
  return (
    <Fragment>
      <div className="p-4 flex flex-col space-y-6">
        <h1 className="plan">basic plan</h1>
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-2">
            <h2 className="h2">deposit amount</h2>
            <h4 className="h4">$7000.00 - $30,000.00</h4>
          </div>
          <div className="flex flex-col space-y-2">
            <h2 className="h2">profit (%)</h2>
            <h4 className="h4">25%</h4>
          </div>
        </div>
        <form onSubmit={openConfirmHandler} className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <label className="label">enter amount</label>
            <input
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              className="input"
              type="number"
              min="7000"
              max="30000"
              placeholder="$7,000 - $30,000"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="label">select assets to deposit</label>
            <select
              onChange={(e) => setAsset(e.target.value)}
              value={asset}
              className="select"
            >
              <option className="capitalize" value="">
                select an asset
              </option>
              <option className="capitalize" value="bitcoin">
                bitcoin
              </option>
              <option className="capitalize" value="ethereum">
                ethereum
              </option>
              <option className="capitalize" value="litecoin">
                litecoin
              </option>
              <option className="capitalize" value="USDT">
                USDT
              </option>
              <option className="capitalize" value="others">
                others
              </option>
            </select>
          </div>
          <button onClick={openConfirmHandler} className="button">
            Proceed to deposit
          </button>
        </form>
      </div>
      {show && (
        <Popup
          confirmDeposit={basicDepositHandler}
          show={show}
          setShow={setShow}
          plan={"basic"}
          percentage="25%"
          amount={100}
          address={address}
        />
      )}
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
