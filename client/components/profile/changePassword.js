import React, { Fragment } from "react";

export default function ChangePassword({ setShow }) {
  return (
    <Fragment>
      <div className="overlay"></div>
      <div className="popup bg-orange-300">
        <h1 className="text">update password</h1>
        <hr className="hr" />
        <form className="flex flex-col space-y-6">
          <div className="input-container">
            <label className="label-white-bg text-black">
              current password
            </label>
            <input type="password" placeholder="********" className="input" />
          </div>
          <div className="input-container">
            <label className="label-white-bg text-black">new password</label>
            <input type="password" placeholder="********" className="input" />
          </div>
          <div className="input-container">
            <label className="label-white-bg text-black">
              confirm new password
            </label>
            <input type="password" placeholder="********" className="input" />
          </div>
          <div className="action">
            <button
              type="button"
              onClick={() => setShow(false)}
              className="button"
            >
              cancel
            </button>
            <button className="button">update</button>
          </div>
        </form>
      </div>
    </Fragment>
  );
}
