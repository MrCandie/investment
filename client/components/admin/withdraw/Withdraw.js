import React, { Fragment } from "react";
import Header from "../../UI/header/Header";
import Search from "../../UI/Search";
import WithdrawList from "./WithdrawList";

export default function Withdraw({ withdraws }) {
  return (
    <Fragment>
      <Header />
      <div className="bg-mobile">
        <div className="mobile h-[700px] bg-orange-600 flex flex-col space-y-6">
          <Search text="transaction" />
          <hr />
          {withdraws.length === 0 ? (
            <div className="flex items-center justify-center mt-8 p-4">
              <h1 className="h2">no withdraw transactions found</h1>
            </div>
          ) : (
            <WithdrawList withdraws={withdraws} />
          )}
        </div>
      </div>
    </Fragment>
  );
}
