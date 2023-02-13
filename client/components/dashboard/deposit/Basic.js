import React, { Fragment, useState } from "react";
import Popup from "./Popup";

export default function Basic() {
  const [show, setShow] = useState(false);
  return (
    <Fragment>
      <div className="p-4 flex flex-col space-y-6">
        <h1 className="text-2xl font-bold text-orange-900 uppercase">
          basic plan
        </h1>
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
        <form className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <label className="capitalize text-xl text-white font-semibold text-start">
              enter amount
            </label>
            <input
              className="input"
              type="number"
              min="7000"
              max="30000"
              placeholder="$7,000 - $30,000"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="capitalize text-xl text-white font-semibold text-start">
              select assets to deposit
            </label>
            <select className="select">
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
          <button
            type="button"
            onClick={() => setShow(true)}
            className="button"
          >
            Proceed to deposit
          </button>
        </form>
      </div>
      {show && (
        <Popup
          show={show}
          setShow={setShow}
          plan={"basic"}
          percentage="25%"
          amount={100}
          address={"n1nRfQvRxDFZ9m8PFeWdsnsDGptHKBSHsk"}
        />
      )}
    </Fragment>
  );
}
