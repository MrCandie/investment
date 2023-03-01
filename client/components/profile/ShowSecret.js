import Link from "next/link";
import React, { Fragment } from "react";

export default function ShowSecret({ setShow, setShow1, user }) {
  const secret = localStorage.getItem("secret");

  function modalHandler() {
    setShow(false);
    setShow1(true);
  }
  return (
    <Fragment>
      <div className="overlay"></div>
      <div className="popup bg-white">
        <h1 className="text text-orange-600">
          Copy and paste code in authenticator app
        </h1>
        <hr className="hr" />
        {user?.authIsSet ? (
          <p className="text-base text-center text-orange-700">
            2FA has been set up
          </p>
        ) : (
          <p className=" text-black text-center text-[0.6rem] md:text-xs lg:text-sm font-bold">
            {secret}
          </p>
        )}
        <div className="action">
          <button onClick={() => setShow(false)} className="button">
            cancel
          </button>
          <button
            disabled={user?.authIsSet}
            onClick={modalHandler}
            className="button"
          >
            Proceed
          </button>
        </div>
      </div>
    </Fragment>
  );
}
