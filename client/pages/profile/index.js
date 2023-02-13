import React, { Fragment } from "react";
import Profile from "../../components/profile/Profile";
import Header from "../../components/UI/header/Header";
import Navigation from "../../components/UI/navigation/Navigation";

export default function Index() {
  return (
    <Fragment>
      <Header />
      <Profile />
      <Navigation />
    </Fragment>
  );
}
