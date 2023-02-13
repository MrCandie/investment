import React, { Fragment } from "react";
import Setting from "../../components/setting/Setting";
import Header from "../../components/UI/header/Header";
import Navigation from "../../components/UI/navigation/Navigation";

export default function Index() {
  return (
    <Fragment>
      <Header />
      <Setting />
      <Navigation />
    </Fragment>
  );
}
