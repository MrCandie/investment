import Link from "next/link";
import React, { Fragment } from "react";

export default function TransactionModal({ setShow }) {
  return (
    <Fragment>
      <div onClick={() => setShow(false)} className="overlay"></div>
      <div className="bg-white popup">
        <div className="flex flex-col">
          <Link
            href="/admin/transactions/deposits"
            className="text-orange-600 p-4 rounded-lg hover:shadow-lg hover:bg-orange-300 transition-all duration-300 hover:opacity-80 font-semibold text-start"
          >
            Deposits
          </Link>
          <Link
            href=""
            className="text-orange-600 p-4 rounded-lg hover:shadow-lg hover:bg-orange-300 transition-all duration-300 hover:opacity-80 font-semibold text-start"
          >
            withdrawals
          </Link>
        </div>
      </div>
    </Fragment>
  );
}
