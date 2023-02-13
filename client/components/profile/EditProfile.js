import React, { Fragment, useState } from "react";

export default function EditProfile({ setShow }) {
  const [name, setName] = useState("");
  return (
    <Fragment>
      <div className="overlay"></div>
      <div className="popup bg-orange-300">
        <h1 className="text">edit profile</h1>
        <hr className="hr" />
        <form className="flex flex-col space-y-6">
          <div className="input-container">
            <label className="label-white-bg text-black">Name</label>
            <input type="text" placeholder="John Doe" className="input" />
          </div>
          <div className="input-container">
            <label className="label-white-bg text-black">profile picture</label>
            <input type="file" />
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
