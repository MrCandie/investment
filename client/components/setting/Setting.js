import React, { useState } from "react";
import { updateWallets } from "../../util/auth";
import Spinner from "../UI/spinner/Spinner";

export default function Setting({ wallet }) {
  if (!wallet) {
    return <Spinner />;
  }
  const [btc, setBtc] = useState(wallet.bitcoin ? wallet.bitcoin : "");
  const [eth, setEth] = useState(wallet.ethereum ? wallet.ethereum : "");
  const [ltc, setLtc] = useState(wallet.litecoin ? wallet.litecoin : "");
  const [usdt, setUsdt] = useState(wallet.usdt ? wallet.usdt : "");

  async function updateHandler(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const data = {
      bitcoin: btc,
      litecoin: ltc,
      ethereum: eth,
      usdt,
    };

    try {
      const response = await updateWallets(wallet.id, data, token);
      alert("wallet update successful");
    } catch (err) {
      console.log(err);
      alert("wallet update failed");
    }
  }

  return (
    <div className="flex flex-col bg-orange-200 p-4 h-[90vh]  items-center">
      <div className="bg-orange-400 rounded-xl shadow-xl w-full md:w-[60%] p-4 lg:w-[40%] mt-8 flex flex-col space-y-6">
        <h1 className="text">update wallet details</h1>
        <form
          onSubmit={updateHandler}
          className="w-full  mt-8 flex flex-col space-y-6"
        >
          <div className="input-container">
            <label className="label-white-bg">bitcoin</label>
            <input
              onChange={(e) => setBtc(e.target.value)}
              value={btc}
              type="text"
              placeholder="Enter your bitcoin address"
              className="input"
            />
          </div>
          <div className="input-container">
            <label className="label-white-bg">USDT</label>
            <input
              onChange={(e) => setUsdt(e.target.value)}
              value={usdt}
              placeholder="Enter your USDT (BEP20) address"
              type="text"
              className="input"
            />
          </div>
          <div className="input-container">
            <label className="label-white-bg">litecoin</label>
            <input
              onChange={(e) => setLtc(e.target.value)}
              value={ltc}
              type="text"
              placeholder="Enter your litecoin address"
              className="input"
            />
          </div>
          <div className="input-container">
            <label className="label-white-bg">ethereum</label>
            <input
              onChange={(e) => setEth(e.target.value)}
              value={eth}
              type="text"
              placeholder="Enter your ethereum address"
              className="input"
            />
          </div>
          <div className="action">
            <button className="button">update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
