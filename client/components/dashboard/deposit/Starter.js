import React, { Fragment, useState } from "react";
import { createDeposit } from "../../../util/auth";
import Notification from "../../UI/notification/Notification";
import Popup from "./Popup";

export default function Starter({
  show,
  setShow,
  modal,
  setModal,
  loading,
  confirmDeposit,
}) {
  // const [show, setShow] = useState(false);
  // const [modal, setModal] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    text: "",
    title: "",
    status: "",
  });

  const [amount, setAmount] = useState("");
  const [asset, setAsset] = useState("");

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
    if (Number(amount) < 100 || Number(amount) > 6000) {
      setNotification({
        title: "error",
        text: "amount for starter plan cannot be less then $100 or more than $6000",
        status: "error",
      });
      setModal(true);
      return;
    }
    setShow(true);
  }

  async function starterDepositHandler() {
    const data = {
      amount,
      asset,
      plan: "starter",
      status: "pending",
    };
    return await confirmDeposit(data);
  }

  return (
    <Fragment>
      <div className="p-4 flex flex-col space-y-6">
        <h1 className="plan">starter plan</h1>
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-2">
            <h2 className="h2">deposit amount</h2>
            <h4 className="h4">$100.00 - $6000.00</h4>
          </div>
          <div className="flex flex-col space-y-2">
            <h2 className="h2">profit (%)</h2>
            <h4 className="h4">20%</h4>
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
              max="6000"
              min="100"
              placeholder="$100 - $6000"
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
          <button className="button">Proceed to deposit</button>
        </form>
      </div>
      {show && (
        <Popup
          confirmDeposit={starterDepositHandler}
          show={show}
          setShow={setShow}
          plan={"starter"}
          percentage="20%"
          amount={100}
          address={"n1nRfQvRxDFZ9m8PFeWdsnsDGptHKBSHsk"}
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
