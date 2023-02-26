import { useRouter } from "next/router";
import React, { Fragment } from "react";
import Header from "../../UI/header/Header";

import { BsArrowLeft } from "react-icons/bs";
import Search from "../../UI/Search";
import DepositList from "./DepositList";

export default function Deposit({ deposits }) {
  const router = useRouter();

  return (
    <Fragment>
      <Header />
      <div className="bg-mobile">
        <div className="mobile h-[700px] bg-orange-600 flex flex-col space-y-6">
          <Search text="transaction" />
          <hr />
          {deposits.length === 0 ? (
            <div className="flex items-center justify-center mt-8 p-4">
              <h1 className="h2">no deposit transactions found</h1>
            </div>
          ) : (
            <DepositList deposits={deposits} />
          )}
        </div>
      </div>
    </Fragment>
  );
}
