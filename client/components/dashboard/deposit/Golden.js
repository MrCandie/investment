import React, { Fragment, useState } from "react";
import Popup from "./Popup";

export default function Golden() {
  const [show, setShow] = useState(false);
  return (
    <Fragment>
      <div className="p-4 flex flex-col space-y-6">
        <h1 className="plan">golden plan</h1>
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-2">
            <h2 className="h2">deposit amount</h2>
            <h4 className="h4">$100,000.00 - unlimited</h4>
          </div>
          <div className="flex flex-col space-y-2">
            <h2 className="h2">profit (%)</h2>
            <h4 className="h4">35%</h4>
          </div>
        </div>
        <form className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-2">
            <label className="label">enter amount</label>
            <input
              className="input"
              type="number"
              min="100000"
              placeholder="$31,000 - $100,000"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="label">select assets to deposit</label>
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
          plan={"golden"}
          percentage="50%"
          amount={100}
          address={"n1nRfQvRxDFZ9m8PFeWdsnsDGptHKBSHsk"}
        />
      )}
    </Fragment>
  );
}
