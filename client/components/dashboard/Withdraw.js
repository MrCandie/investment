import React, { Fragment } from "react";

export default function Withdraw({ setShow }) {
  return (
    <Fragment>
      <div className="overlay"></div>
      <div className="popup bg-orange-600">
        <h1 className="text text-white">initiate a withdrawal</h1>
        <hr className="hr" />
        <form className="flex flex-col space-y-6">
          <div className="input-container">
            <label className="label">enter amount</label>
            <input type="number" className="input" />
          </div>
          <div className="input-container">
            <label className="label">select your plan</label>
            <select className="select">
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
            <select className="select">
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
            </select>
          </div>
          <div className="input-container">
            <label className="label">withdrawal address</label>
            <input type="text" className="input" />
          </div>
          <div className="action">
            <button
              type="button"
              onClick={() => setShow(false)}
              className="button"
            >
              cancel
            </button>
            <button className="button">withdraw</button>
          </div>
        </form>
      </div>
    </Fragment>
  );
}
