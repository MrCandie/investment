import { useRouter } from "next/router";
import React, { Fragment } from "react";
import Header from "../UI/header/Header";

import { BsArrowLeft } from "react-icons/bs";
import Search from "../UI/Search";
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
          <DepositList deposits={deposits} />
        </div>
      </div>
    </Fragment>
  );
}
