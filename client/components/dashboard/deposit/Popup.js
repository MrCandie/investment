import React, { Fragment } from "react";

export default function Popup({
  plan,
  percentage,
  amount,
  address,
  setShow,
  show,
}) {
  return (
    <Fragment>
      <div className="overlay"></div>
      <div className="popup bg-white">
        <h1 className="text text-orange-700">confirm deposit</h1>
        <hr className="hr" />
        <div className="flex flex-col space-y-4">
          <div className="confirm">
            <p className="confirm-p">plan</p>
            <p className="confirm-p">{plan}</p>
          </div>
          <div className="confirm">
            <p className="confirm-p">profit</p>
            <p className="confirm-p">{`${percentage} after 48hours`}</p>
          </div>
          <div className="confirm">
            <p className="confirm-p">principal return</p>
            <p className="confirm-p">yes</p>
          </div>
          <div className="confirm">
            <p className="confirm-p">principal withdraw</p>
            <p className="confirm-p">not available</p>
          </div>
          <div className="confirm">
            <p className="confirm-p">credit amount</p>
            <p className="confirm-p">{amount}</p>
          </div>
          <div className="confirm">
            <p className="confirm-p">deposit fee</p>
            <p className="confirm-p">$0.00</p>
          </div>
        </div>
        <hr className="hr" />
        <div className="">
          <p className="confirm-p">
            send ${amount} to
            <p className="text-sm lg:text-lg text-orange-800">{address}</p>
          </p>
        </div>
        <div className="action">
          <button onClick={() => setShow(false)} className="button">
            cancel
          </button>
          <button className="button">confirm</button>
        </div>
      </div>
    </Fragment>
  );
}
