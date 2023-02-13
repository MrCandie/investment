import React, { Fragment } from "react";
import Deposit from "../../components/dashboard/deposit/Deposit";
import Header from "../../components/UI/header/Header";
import Layout from "../../components/UI/layout/Layout";

export default function Deposits() {
  return (
    <Fragment>
      <Header />
      <Deposit />
    </Fragment>
  );
}
