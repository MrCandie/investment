import React, { Fragment } from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import Header from "../../components/UI/header/Header";
import Layout from "../../components/UI/layout/Layout";

export default function Index() {
  return (
    <Fragment>
      <Header />
      <Dashboard />;
    </Fragment>
  );
}
