import React, { Fragment, useContext } from "react";
import Login from "../../components/auth/Login";
import Deposit from "../../components/dashboard/deposit/Deposit";
import Header from "../../components/UI/header/Header";
import Layout from "../../components/UI/layout/Layout";
import Navigation from "../../components/UI/navigation/Navigation";
import { AppContext } from "../../util/context";

export default function Deposits() {
  const ctx = useContext(AppContext);
  return (
    <Fragment>
      {ctx.isLoggedIn ? (
        <>
          <Header />
          <Deposit />
          <Navigation />
        </>
      ) : (
        <Login />
      )}
    </Fragment>
  );
}
