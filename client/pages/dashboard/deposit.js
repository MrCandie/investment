import React, { Fragment } from "react";
import Deposit from "../../components/dashboard/deposit/Deposit";
import Header from "../../components/UI/header/Header";
import Layout from "../../components/UI/layout/Layout";
import Navigation from "../../components/UI/navigation/Navigation";

export default function Deposits() {
  return (
    <Fragment>
      <Header />
      <Deposit />
      <Navigation />
    </Fragment>
  );
}
